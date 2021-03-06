const fs = require('fs');
const path = require('path');
const express = require('express');
const log = require('../tools/logger');
const AuthController = require('../controllers/api/auth/auth.controller');

class Router {

  constructor() {
    this.startFolder = null;
  }

  //Called once during initial server startup
  load(app, folderName) {

    if (!this.startFolder) 
      this.startFolder = path.basename(folderName);
    
    fs.readdirSync('./server/' + folderName).forEach((file) => {

      const fullName = path.join(folderName, file);
      const stat = fs.lstatSync('./server/' + fullName);

      //Recursively walk-through folders
      if (stat.isDirectory()) {
        this.load(app, fullName);
      } else if (file.toLowerCase().indexOf('.js')) {
        //Grab path to JavaScript file and use it to construct the route
        let dirs = path
          .dirname(fullName)
          .split(path.sep);

        if (dirs[0].toLowerCase() === this.startFolder.toLowerCase()) {
          dirs.splice(0, 1);
        }

        //postupne budujeme routy pro jednotlive controllery s tim, ze kazdu controller
        //ma svuj vlastni router takze pro nej muzeme pouzit vlastni middleware -
        //treba v nem muzeme logovat atd
        const router = express.Router();
        //Generate the route
        const baseRoute = '/' + dirs.join('/');

        //Load the JavaScript file ("controller") and pass the router to it 
        //- check if constructor contains only 1 arg (router)
        //- different controllers must be called manually
        const controllerClass = require('../' + fullName);
        if(controllerClass.length > 1)
          return;
        log.info('Created route: ' + baseRoute + ' for ' + fullName);
        const controller = new controllerClass(router);
        
        //Associate the route with the router
        app.use(baseRoute, router);
      }
    });
  }

  //setting up route for authentification
  auth(app, passport){
    log.info('Created route: ' + 'api/auth' + ' for auth.controller.js');
    const router = express.Router();
    const authController = new AuthController(router, passport);
    app.use('/api/auth', router);
  }
}

module.exports = new Router();
