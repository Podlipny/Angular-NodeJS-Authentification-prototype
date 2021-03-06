const LocalStrategy = require('passport-local').Strategy;
const userRepo   = require('../repositories/user.repository');

class PassportLocal{
  
  config(passport){
    
    //local login
    passport.use('local-login', new LocalStrategy({
        //by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true //allows us to pass in the req from our route (lets us check if a user is logged in or not)
      }, 
      this.login.bind(this)
    ));

     //local register
     passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
      }, 
      this.register.bind(this)
    ));
  }

  login(req, email, password, done){    
    if (email)
      email = email.toLowerCase(); //Use lower-case e-mails to avoid case-sensitive e-mail matching

    //asynchronous
    process.nextTick(function () {
      userRepo.getUser({'local.email': email }, function (err, user) {
        // if there are any errors, return the error
        if (err)
          return done(err);

        //if no user is found, return the message
        if (!user)
          return done(null, false, { success: false, message: 'No user found.'});

        if (!user.validPassword(password))
          return done(null, false, { success: false, message: 'Oops! Wrong password.' });

        //all is well, return user
        else
          return done(null, user);
      });
    });
  }

  register(req, email, password, done) {
    if (email) 
      email = email.toLowerCase();

    //asynchronous
    process.nextTick(function () {
      //if the user is not already logged in:
      if (!req.user) {
        userRepo.getUser({'local.email': email}, function (err, user) {
          //if there are any errors, return the error
          if (err) 
            return done(err);
          
          //check to see if theres already a user with that email
          if (user) {
            return done(null, false, { success: false, message: 'That email is already taken.'});
          } else {
            //create the user
            var newUser = {
              email: email,
              local: {
                email: email,
                password: password
              }
            };

            userRepo.insertUser(newUser, function (err, user) {
              if (err) 
                return done(err);
              
              return done(null, user);
            });
          }

        });
      //if the user is logged in but has no local account...
      } else if (!req.user.local.email) {
        //...presumably they're trying to connect a local account BUT let's check if
        //the email used to connect a local account is being used by another user
        userRepo.getUser({'local.email': email}, function (err, user) {
          if (err) 
            return done(err);
          
          if (user) {
            return done(null, false, { success: false, message: 'That email is already taken.' });
            //Using 'loginMessage instead of signupMessage because it's used by // /connect/local'
          } else {
            var user = req.user;
            if(!user.email)
              user.email = email;
            user.local.email = email;
            user.local.password = user.generateHash(password);
            userRepo.updateUser(user, function (err) {
              if (err) 
                return done(err);
              
              return done(null, user);
            });
          }
        });
      } else {
        //user is logged in and already has a local account. Ignore signup. (You should
        //log out before trying to create a new account, user!)
        return done(null, req.user);
      }
    });
  }
}

var passportLocal = new PassportLocal();
module.exports = passportLocal.config.bind(passportLocal);