const mongoose = require('mongoose');
const userModel = require('../models/user');

class UserRepository{
  
  //get all the users
  getUsers(callback) {
    console.log('*** UserRepository.getUsers');
    userModel.find({}, (err, users) => {
      if (err) { 
        console.log(`*** UserRepository.getUsers error: ${err}`); 
        return callback(err); 
      }
      callback(null, users);
    });
  }

  //insert a  user
  insertUser(body, callback) {
    console.log('*** UserRepository.insertUser');
    console.log(body);

    let user = new userModel();
    user.name = body.name;
    user.email = body.email;
    
    user.save((err, user) => {
      if (err) { 
          console.log(`*** UserRepository insertUser error: ${err}`); 
          return callback(err, null); 
      }

      callback(null, user);
    });
  }

  updateUser(id, body, callback) {
    console.log('*** UserRepository.updateUser');

    userModel.findById(id, (err, user)  => {
      if (err) { 
        console.log(`*** UserRepository.updateUser error: ${err}`); 
        return callback(err); 
      }

      user.name = body.name || user.name;
      user.email = body.email || user.email;

      user.save((err, user) => {
        if (err) { 
            console.log(`*** UserRepository.updateUser error: ${err}`); 
            return callback(err, null); 
        }

        callback(null, user);
      });
    });
  }

  //delete a user
  deleteUser(id, callback) {
    console.log('*** UserRepository.deleteUser');

    userModel.remove({ '_id': id }, (err, user) => {
        if (err) { 
          console.log(`*** UserRepository.deleteUser error: ${err}`); 
          return callback(err, null); 
        }
        callback(null, user);
    });
  }

}

module.exports = new UserRepository();