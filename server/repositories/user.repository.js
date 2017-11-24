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
    if(body.local){
      user.local = {
        email: body.local.email,
        password: user.generateHash(body.local.password)
      };
    }
    if(body.facebook){
      user.facebook = body.facebook;
    }
    if(body.twitter){
      user.twitter = body.twitter;
    }
    if(body.google){
      user.google = body.google;
    }

    user.save((err, user) => {
      if (err) { 
        log.error(`*** UserRepository insertUser error: ${err}`); 
        return callback(err, null); 
      }

      callback(null, user);
    });
  }

  updateUser(id, body, callback) {
    log.trace('*** UserRepository.updateUser');

    userModel.findById(id, (err, user)  => {
      if (err) { 
        log.error(`*** UserRepository.updateUser error: ${err}`); 
        return callback(err); 
      }

      user.name = body.name || user.name;
      user.email = body.email || user.email;

      if(user.local){
        user.local = body.local || user.local;
      }
      if(user.facebook){
        user.facebook = body.facebook || user.facebook;
      }
      if(user.twitter){
        user.twitter = body.twitter || user.twitter;
      }
      if(user.google){
        user.google = body.google || user.google;
      }

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