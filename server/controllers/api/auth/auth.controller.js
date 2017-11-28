class AuthController {
  constructor(router, passport){

    router.post('/login', this.login(passport, 'local-login'));
    router.post('/register', this.register(passport));

    router.get('/logout', (req, res) => {
      req.logout();
      res.json({'success': true});
    });

    router.get('/facebook', passport.authenticate('facebook', { scope : ['public_profile', 'email'] }));
    //handle the callback after facebook has authenticated the user
    router.get('/facebook/callback', this.login(passport, 'facebook'));

    router.get('/twitter', passport.authenticate('twitter', { scope : 'email' }));
    //handle the callback after twitter has authenticated the user
    router.get('/twitter/callback', this.login(passport, 'twitter'));

  }
  
  /** 
   * 
   * @param {passport} passport handler for passport
   * @param {string} strategy type of strategy
   * @memberof AuthController
   */
  login(passport, strategy) {
    return (req, res, next) => {
      passport.authenticate(strategy, function(err, user, info) {
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