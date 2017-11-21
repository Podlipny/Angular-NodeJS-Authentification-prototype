const LocalStrategy = require('passport-local').Strategy;
const UserModel   = require('../models/user');

class PassportLocal{
  
  config(passport){
    //local login
    passport.use('local-login', new LocalStrategy({
        //by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true //allows us to pass in the req from our route (lets us check if a user is logged in or not)
      }, 
      this.login(req, email, password, done)
    ));

     //local register
     passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
      }, 
      this.login(req, email, password, done)
    ));
  }

  login(req, email, password, done){
    if (email)
      email = email.toLowerCase(); //Use lower-case e-mails to avoid case-sensitive e-mail matching

    //asynchronous
    process.nextTick(function () {
      UserModel.findOne({'local.email': email }, function (err, user) {
        // if there are any errors, return the error
        if (err)
          return done(err);

        //if no user is found, return the message
        if (!user)
          return done(null, false, req.flash('loginMessage', 'No user found.'));

        if (!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

        //all is well, return user
        else
          return done(null, user);
      });
    });
  }

  register(req, email, password, done) {
  }
}

module.exports = new PassportLocal().config;