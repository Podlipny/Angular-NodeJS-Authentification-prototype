const express      = require('express');
const session      = require('express-session');
const morgan       = require('morgan');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');

// database        = require('./lib/database'),
// seeder          = require('./lib/dbSeeder'),

const router = require('./server/routes/router');
const app    = express();
const port   = process.env.PORT || 3000;
const log    = require('./server/tools/logger'); 

const configDB = require('./server/config/database.js');
const mongoose = require('mongoose');

const passport = require('passport');
const passportConfig = require('./server/config/passport');

class Server {
  constructor() {
    this.initConfiguration();
    this.initExpressMiddleWare();
    if (process.env.NODE_ENV === "development") {
      this.initDbSeeder();
    }
    this.initRoutes();
    this.start();
  }

  initConfiguration(){
    mongoose.connect(configDB.url, { useMongoClient: true });
    passportConfig(passport);
  }

  initExpressMiddleWare() {
    app.use(express.static(__dirname + "/public"));
    app.use(morgan('dev')); //log every request to the console
    
    app.use(cookieParser()); //read cookies (needed for auth)
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    
    //required for passport
    app.use(session({
      secret: 'somesecretforsessionsomesecretforsession', //session secret
      resave: true,
      saveUninitialized: true
      // cookie: {
      //   secure: true,
      //   maxAge: 60 * 1000
      // },
      // rolling: true
    }));
    app.use(passport.initialize());
    app.use(passport.session()); //persistent login sessions

    process.on("uncaughtException", err => {
      if (err) 
        log.error(err, err.stack);
    });
  }

  initDbSeeder() {
    // database.open(() => {
    //   seeder.init();
    // });
  }

  initRoutes() {
    router.load(app, "controllers");
    router.auth(app, passport);
  }

  start() {
    app.listen(port, err => {
      log.success('[' + process.env.NODE_ENV + ']' + 'Listening on http://localhost:' + port);
    });
  }
}

let server = new Server();