const express         = require('express'),
      bodyParser      = require('body-parser'),
      cookieParser    = require('cookie-parser'),
      // errorhandler    = require('errorhandler'),
      // favicon         = require('serve-favicon'),
      router          = require('./routes/router'),
      // database        = require('./lib/database'),
      // seeder          = require('./lib/dbSeeder'),
      app             = express(),
      port            = 3000;

class Server {
  constructor() {
    this.initExpressMiddleWare();
    if (process.env.NODE_ENV === "development") {
      this.initDbSeeder();
    }
    this.initRoutes();
    this.start();
  }

  start() {
    app.listen(port, err => {
      console.log(
        "[%s] Listening on http://localhost:%d",
        process.env.NODE_ENV,
        port
      );
    });
  }

  initExpressMiddleWare() {
    app.use(express.static(__dirname + "/public"));
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    // app.use(errorhandler());
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

  initRoutes() {
    router.load(app, "./controllers");

    // // redirect all others to the index (HTML5 history)
    // app.all('/*', (req, res) => {
    //   res.sendFile(__dirname + '/public/index.html');
    // });
  }
}

let server = new Server();