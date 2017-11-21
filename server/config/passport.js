const passportLocal = require('./passport.local');
const passportfacebook = require('./passport.facebook');

class Passport{
  constructor(passport){
    this.passport = passport;
  }

  init(){

  }
}

module.exports = Passport;