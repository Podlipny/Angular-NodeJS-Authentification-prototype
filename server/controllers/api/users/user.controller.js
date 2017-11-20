const userRepo = require('../../../repositories/user.repository');
const util = require('util'); //NodeJs Util pro logging

class UserController{
  constructor(router){
    router.get('/', this.getUsers.bind(this));
    // router.get('/:id', this.getUser.bind(this));
    router.post('/', this.insertUser.bind(this));
    router.put('/:id', this.updateUser.bind(this));
    router.delete('/:id', this.deleteUser.bind(this));
  }

  getUsers(req, res) {
    console.log('*** getUsers');

    userRepo.getUsers((err, users) => {
      if (err) {
        console.log('*** getUsers error: ' + util.inspect(err));
        res.json(null); //TODO: report error to user and set state
        //res.json({ error: err }); tot je dalsi moznost
      } else {
        console.log('*** getUsers ok');
        res.json(users);
      }
    });
  }

  insertUser(req, res) {
    console.log('*** insertUser');
    
    userRepo.insertUser(req.body, (err, user) => {
      if (err) {
        console.log('*** userRepo.insertUser error: ' + util.inspect(err));
        res.json({status: false, error: 'Insert failed', user: null});
      } else {
        console.log('*** insertUser ok');
        res.json({ status: true, error: null, user: user });
      }
    });
  }

  updateUser(req, res) {}
  
  deleteUser(req, res) {
    console.log('*** deleteUser');
    
    userRepo.deleteUser(req.params.id, (err) => {
      if (err) {
        console.log('*** deleteUser error: ' + util.inspect(err));
        res.json({ status: false });
      } else {
        console.log('*** deleteUser ok');
        res.json({ status: true });
      }
    });
  }
}

module.exports = UserController;