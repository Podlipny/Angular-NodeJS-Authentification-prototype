const format = require("string-template");
const chalk = require('chalk');

//logs into file and console
class Logger{
  info(message){
    console.log(chalk.blue(format('[info] {0}', [message])));
  }

  success(message){
    console.log(chalk.green(format('[success] {0}', [message])));
  }

  error(message, err){
    console.log(chalk.red(format('[error] {0} \n{1}', [message, err])));
  }

  trace(message){
    console.log(format('[trace] {0}', [message]));
  }

  debug(message){
    console.log(format('[debug] {0}', [message]));
  }
}

module.exports = new Logger();