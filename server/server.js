const express      = require('express');
const session      = require('express-session');
const morgan       = require('morgan');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');

// database        = require('./lib/database'),
// seeder          = require('./lib/dbSeeder'),

const router = require('./routes/router');
const app    = express();
const port   = process.env.PORT || 3000;

const configDB = require('./config/database.js');
const mongoose = require('mongoose');


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

  // configuration ===============================================================
  initConfiguration(){
    mongoose.connect(configDB.url, { useMongoClient: true });
  }

  initExpressMiddleWare() {
    // app.use(express.static(__dirname + "/public")); We dont need static folder for API
    app.use(morgan('dev')); // log every request to the console
    
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    process.on("uncaughtException", err => {
      if (err) console.log(err, err.stack);
    });
  }

  initDbSeeder() {
    // database.open(() => {
    //   seeder.init();
    // });
  }

  // routes ======================================================================
  initRoutes() {
    router.load(app, "./controllers");
  }

  // launch ======================================================================
  start() {
    app.listen(port, err => {
      console.log("[%s] Listening on http://localhost:%d",  process.env.NODE_ENV, port);
    });
  }
}

let server = new Server();