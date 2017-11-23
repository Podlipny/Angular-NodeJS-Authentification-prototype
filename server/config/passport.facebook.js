class Passportfacebook{

  config(passport){

  }
}

const passportfacebook = new Passportfacebook();
module.exports = passportfacebook.config.bind(passportfacebook);