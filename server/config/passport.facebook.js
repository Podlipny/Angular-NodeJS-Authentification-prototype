const FacebookStrategy = require('passport-facebook').Strategy;
const passportConfig   = require('../config/passport.config');
const userRepo         = require('../repositories/user.repository');

class Passportfacebook{

  config(passport){
    var fbStrategy = passportConfig.facebookAuth;
    fbStrategy.passReqToCallback = true;  //allows us to pass in the req from our route (lets us check if a user is logged in or not)
    passport.use(new FacebookStrategy(fbStrategy, this.authenticate.bind(this)));
  }

  authenticate(req, token, refreshToken, profile, done) {
    //asynchronous
    // process.nextTick(function () {
        //check if the user is already logged in
        if (!req.user) {
          userRepo.getUser({ 'facebook.id': profile.id }, function (err, user) {
            if (err) 
              return done(err);
              
            if (user) {
              //if there is a user id already but no token (user was linked at one point and then removed)
              if (!user.facebook.token) {
                user.facebook.token = token;
                user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                userRepo.updateUser(user, function (err) {
                  if (err) 
                    return done(err);
                  
                  return done(null, user);
                });
              }

              return done(null, user); //user found, return that user
            } else {
              //if there is no user, create them
              var newUser = {
                email: (profile.emails[0].value || '').toLowerCase(),
                facebook: {
                  id: profile.id,
                  token: token,
                  name: profile.name.givenName + ' ' + profile.name.familyName,
                  email: (profile.emails[0].value || '').toLowerCase()
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

          user.facebook.id = profile.id;
          user.facebook.token = token;
          user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
          user.facebook.email = (profile.emails[0].value || '').toLowerCase();

          userRepo.updateUser(user, function (err) {
            if (err) 
              return done(err);
            
            return done(null, user);
          });
        }
      // });
  }
}

const passportfacebook = new Passportfacebook();
module.exports = passportfacebook.config.bind(passportfacebook);