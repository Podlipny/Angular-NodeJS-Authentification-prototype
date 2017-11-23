const mongoose  = require('mongoose');
const userModel = require('../models/user');
const log       = require('../tools/logger');

class UserRepository{
  
  //get all the users
  getUsers(callback) {
    log.trace('*** UserRepository.getUsers');
    userModel.find({}, (err, users) => {
      if (err) { 
        log.trace(`*** UserRepository.getUsers error: ${err}`); 
        return callback(err); 
      }
      callback(null, users);
    });
  }

  //get all the users
  getUser(query, callback) {
    log.trace('*** UserRepository.getUser');
    userModel.findOne(query, (err, user) => {
      if (err) { 
        log.trace(`*** UserRepository.getUser error: ${err}`); 
        return callback(err); 
      }
      callback(null, user);
    });
  }

  //insert a  user
  insertUser(body, callback) {
    log.trace('*** UserRepository.insertUser\n' + body);

    let user = new userModel();
    user.name = body.name;
    user.email = body.email;
    
    user.save((err, user) => {
      if (err) { 
        log.error(`*** UserRepository insertUser error: ${err}`); 
        return callback(err, null); 
      }

      callback(null, user);
    });
  }

  updateUser(id, body, callback) {
    log.error('*** UserRepository.updateUser');

    userModel.findById(id, (err, user)  => {
      if (err) { 
        log.error(`*** UserRepository.updateUser error: ${err}`); 
        return callback(err); 
      }

      user.name = body.name || user.name;
      user.email = body.email || user.email;

      user.save((err, user) => {
        if (err) { 
          log.error(`*** UserRepository.updateUser error: ${err}`); 
          return callback(err, null); 
        }

        callback(null, user);
      });
    });
  }

  //delete a user
  deleteUser(id, callback) {
    log.trace('*** UserRepository.deleteUser');

    userModel.remove({ '_id': id }, (err, user) => {
        if (err) { 
          log.error(`*** UserRepository.deleteUser error: ${err}`); 
          return callback(err, null); 
        }
        callback(null, user);
    });
  }

}

module.exports = new UserRepository();