class ApiController {

  constructor(router) {
    router.get('/', this.getRoot.bind(this));
    router.get('/api', this.getApiRoot.bind(this));
  }

  //returns / root of server
  getRoot(req, res) {
    console.log('*** getRoot - /');
    res.status(200);
    res.json('Welcome to authentification prototype!');
  }

  //returns /api root of api
  getApiRoot(req, res) {
    console.log('*** getApi - /api');
    res.status(200);
    res.json('Welcome to API please authenticate for further proceed!');
  }
}

module.exports = ApiController;