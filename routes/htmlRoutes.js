

var htmlController = require('../controllers/htmlController.js');

module.exports = function (app) {

    app.get("/", htmlController.index);

    app.get("/scrape", htmlController.scrape);

    app.get("/articles", htmlController.articles);

    app.post("/savearticle", htmlController.saveArticle);

    // Get all Saved Articles
    app.get("/savedarticle", htmlController.savedArticle);

    // Get Save HBS page
    app.get("/saved", htmlController.saved);

    app.delete("/removeSaved", htmlController.deleteSavedArticle);

    app.get("/getNote", htmlController.getNote);

    app.post("/addNote", htmlController.addNote);
    

};

