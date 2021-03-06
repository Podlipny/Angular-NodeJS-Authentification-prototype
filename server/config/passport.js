const passportLocal = require('./passport.local');
const passportFacebook = require('./passport.facebook');
const userModel = require('../models/user');

class Passport{

  //configure standalone strategies for authentification
  config(passport){
    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
      done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
      userModel.findById(id, function (err, user) {
        done(err, user);
      });
    });

    //load strategies configuration
    passportLocal(passport);
    passportFacebook(passport);
  }
}

module.exports = new Passport().config;