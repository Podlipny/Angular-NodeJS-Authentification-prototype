class ApiController {

  constructor(router) {
    router.get('/', this.getIndex.bind(this));
    router.get('/api', this.getApiIndex.bind(this));
  }

  //returns / root of server
  getIndex(req, res) {
    console.log('*** get index.html - /');
    res.sendfile('../public/index.html');
  }

  //returns /api root of api
  getApiIndex(req, res) {
    console.log('*** getApi - /api');
    res.status(200);
    res.json('Welcome to API please authenticate for further proceed!');
  }
}

module.exports = ApiController;