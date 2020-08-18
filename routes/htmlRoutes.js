

var htmlController = require('../controllers/htmlController.js');

module.exports = function (app) {

    app.get("/", htmlController.index);

    app.get("/scrape", htmlController.scrape);

    app.get("/articles", htmlController.articles);

};

