// const userRepo = require('../../../repositories/user.repository'); 

class AuthController {
  constructor(router, passport){

    router.post('/login', this.login(passport));
    router.post('/register', this.register(passport));

    router.get('/logout', (req, res) => {
      req.logout();
      res.json({'success': true});
    });

  }
  
  login(passport) {
    return (req, res, next) => {
      passport.authenticate('local-login', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.json(info); }
        
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.json({ 'success' : true });
        });
      })(req, res, next);
    };
  }

  register(passport) {
    return (req, res, next) => {
      passport.authenticate('local-signup', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.json(info); }
        
        //register was successfull - log User
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.json({ 'success': true, user: user });
        });
      })(req, res, next);
    };
  }

}

module.exports = AuthController;