

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

    title: {
        type: String
        ,required: true
    },

    link: {
        type: String
        ,required: true
    },

    summary : {
        type: String,
        required: false
    },
    
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },

    saved: {
        type: Schema.Types.ObjectId,
        ref: "SavedArticle"
    }

});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;




