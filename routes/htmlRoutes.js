var authController = require('../controllers/htmlController.js');

module.exports = function (app) {

    app.get("/", authController.index);

    app.get("/about", authController.about);

    app.get("/feed", authController.feed);


};

