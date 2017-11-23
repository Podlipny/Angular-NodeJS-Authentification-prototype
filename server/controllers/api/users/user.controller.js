const userRepo = require('../../../repositories/user.repository');
const util = require('util'); //NodeJs Util pro logging
const log  = require('../../../tools/logger'); 

class UserController{
  constructor(router){
    router.get('/', this.getUsers.bind(this));
    // router.get('/:id', this.getUser.bind(this));
    router.post('/', this.insertUser.bind(this));
    router.put('/:id', this.updateUser.bind(this));
    router.delete('/:id', this.deleteUser.bind(this));
  }

  getUsers(req, res) {
    log.trace('*** getUsers');

    userRepo.getUsers((err, users) => {
      if (err) {
        log.error('*** getUsers error: ' + util.inspect(err));
        res.json(null); //TODO: report error to user and set state
        //res.json({ error: err }); tot je dalsi moznost
      } else {
        log.trace('*** getUsers ok');
        res.json(users);
      }
    });
  }

  insertUser(req, res) {
    log.trace('*** insertUser');
    
    userRepo.insertUser(req.body, (err, user) => {
      if (err) {
        log.error('*** userRepo.insertUser error: ' + util.inspect(err));
        res.json({status: false, error: 'Insert failed', user: null});
      } else {
        log.trace('*** insertUser ok');
        res.json({ status: true, error: null, user: user });
      }
    });
  }

  updateUser(req, res) {
    log.trace('*** updateUser');
    
    userRepo.updateUser(req.params.id, req.body, (err, user) => {
      if (err) {
        log.error('*** userRepo.updateUser error: ' + util.inspect(err));
        res.json({status: false, error: 'Insert failed', user: null});
      } else {
        log.trace('*** updateUser ok');
        res.json({ status: true, error: null, user: user });
      }
    });
  }
  
  deleteUser(req, res) {
    log.trace('*** deleteUser');
    
    userRepo.deleteUser(req.params.id, (err) => {
      if (err) {
        log.error('*** deleteUser error: ' + util.inspect(err));
        res.json({ status: false });
      } else {
        log.trace('*** deleteUser ok');
        res.json({ status: true });
      }
    });
  }
}

module.exports = UserController;