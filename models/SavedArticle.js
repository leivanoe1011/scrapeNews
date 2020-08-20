

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SavedArticleSchema = new Schema({

    createdDate: {
        type: Date,
        default: Date.now
    }
});

var SavedArticle = mongoose.model("SavedArticle", SavedArticleSchema);

module.exports = SavedArticle;




