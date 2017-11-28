const TwitterStrategy = require('passport-twitter').Strategy;
const passportConfig   = require('../config/passport.config');
const userRepo         = require('../repositories/user.repository');

class PassportTwitter{

  config(passport){
    passport.use(new TwitterStrategy({
      consumerKey     : passportConfig.twitterAuth.consumerKey,
      consumerSecret  : passportConfig.twitterAuth.consumerSecret,
      callbackURL     : passportConfig.twitterAuth.callbackURL,
      passReqToCallback : true }, //allows us to pass in the req from our route (lets us check if a user is logged in or not)
      this.authenticate.bind(this)));
  }

  authenticate(req, token, refreshToken, profile, done) {
    //asynchronous
    process.nextTick(function () {
      //check if the user is already logged in
      if (!req.user) {
        userRepo.getUser({ 'twitter.id': profile.id }, function (err, user) {
          if (err) 
            return done(err);
            
          if (user) {
            //if there is a user id already but no token (user was linked at one point and then removed)
            if (!user.twitter.token) {
              user.twitter.token = token;
              user.twitter.username = profile.username;
              user.twitter.displayName = profile.displayName;

              userRepo.updateUser(user.id, user, function (err) {
                if (err) 
                  return done(err);
                
                return done(null, user);
              });
            }

            return done(null, user); //user found, return that user
          } else {
            //if there is no user, create them
            var newUser = {
              //twitter won't return email - we have to ask user in reg/profile form
              twitter: {
                id: profile.id,
                token: token,
                username: profile.username,
                displayName: profile.displayName
              }
            };
  
            userRepo.insertUser(newUser, function (err) {
              if (err) 
                return done(err);
              
              return done(null, newUser);
            });
          }
        });
      } else {
        //user already exists and is logged in, we have to link accounts
        var user = req.user; //pull the user out of the session

        user.twitter.id = profile.id;
        user.twitter.token = token;
        user.twitter.username    = profile.username;
        user.twitter.displayName = profile.displayName;

        userRepo.updateUser(user.id, user, function (err) {
          if (err) 
            return done(err);
          
          return done(null, user);
        });
      }
    });
  }

}

const passportTwitter = new PassportTwitter();
module.exports = passportTwitter.config.bind(passportTwitter);