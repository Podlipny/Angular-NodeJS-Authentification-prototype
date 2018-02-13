const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

//define the schema for user model
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  address: String,
  address2: String,
  city: String,
  zip: Number,
  country: String,
  phone: Number, 
  local: {
      email: String,
      password: String
  },
  facebook: {
      id: String,
      token: String,
      name: String,
      email: String
  },
  twitter: {
      id: String,
      token: String,
      displayName: String,
      username: String
  },
  google: {
      id: String,
      token: String,
      email: String,
      name: String
  }
});

//generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

//create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);