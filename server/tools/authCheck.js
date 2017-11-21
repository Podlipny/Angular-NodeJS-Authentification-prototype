//middleware class for checking authentification
class AuthCheck{
  isAuthenticated(req, res, next){
    if (req.isAuthenticated())
        return next();

    res.sendStatus(403, {error: 'Please authenticate!'});
  }

  permissions(...roles){
    const isAllowed = role => roles.indexOf(role) > -1;
    
    // return a middleware
    return (req, res, next) => {
      if (req.isAuthenticated() && req.user && isAllowed(req.user.role))
        next(); // role is allowed, so continue on the next middleware
      else {
        response.sendStatus(403, {message: "Forbidden accesss!"}); // user is forbidden
      }
    };
  }
}

module.exports = new AuthCheck();