
var express = require("express");

var logger = require("morgan");

var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");

var cheerio = require("cheerio");

// Require all models
var db = require("../models");


mongoose.connect("mongodb://localhost/nyTimesArticleScrapper", { useNewUrlParser: true });


var exports = module.exports = {};


function resetAllCollections(){
    console.log("Reset all Collection");
   
    db.Article.deleteMany({}, function(err, result) {
        if (err) {
          res.send(err);
        } else {
            db.Note.deleteMany({}, function(err, result) {
                if (err) {
                  res.send(err);
                } else {
                    db.Note.deleteMany({}, function(err, result) {
                        if (err) {
                          res.send(err);
                        } 
                    });
                }
            });
        }
    });     



}


exports.index = function (req, res) {
    res.render("index", { msg: "about page" });
};


exports.saved = function(req, res){
    res.render("saved", { msg: "about page" });
}


exports.scrape = function (req, res){

    resetAllCollections();

    var url = "https://www.nytimes.com";


    // First, we grab the body of the html with axios
    axios.get(url).then(function(response) {

        // console.log(response);


        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
        // Now, we grab every h2 within an article tag, and do the following:
        
        var responseArray = [];

        // Now, we grab every h2 within an article tag, and do the following:
        $("article").each(function(i, element) {


            // Save an empty result object
            var result = {};

            var articleTitle = $(element).find("h2").text();
            var articleLink = ($(element).find("a").attr("href") === undefined) ? "NA" : url + $(element).find("a").attr("href");
            var articleSummary = $(element).find("p").text();
            

            if(articleTitle === "" || articleLink === undefined){
                return;
            }

            if(articleSummary === "" || articleSummary === undefined){
                return;
            }


            result.title = articleTitle;
            result.link = articleLink;
            result.summary = articleSummary;


            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
            .then(function(dbArticle) {
                // View the added result in the console
                // console.log("Response after load")
                // responseArray.push(dbArticle);

            })
            .catch(function(err) {
                // If an error occurred, log it
                console.log(err);
            });
        
        });


        $("div.story-wrapper").each(function(i, element) {


            // Save an empty result object
            var result = {};

            var articleTitle = $(element).find("h3").text();
            var articleLink = ($(element).find("a").attr("href") === undefined) ? "NA" : url + $(element).find("a").attr("href");
            var articleSummary = $(element).find("p").text();
            

            if(articleTitle === "" || articleLink === undefined){
                return;
            }

            if(articleSummary === "" || articleSummary === undefined){
                return;
            }


            result.title = articleTitle;
            result.link = articleLink;
            result.summary = articleSummary;


            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
            .then(function(dbArticle) {
                // View the added result in the console
                // console.log("Response after load")
                // responseArray.push(dbArticle);

            })
            .catch(function(err) {
                // If an error occurred, log it
                console.log(err);
            });
        
        });

        // Send a message to the client
        res.send("Scrape Complete");
        // res.json(responseArray);
  });
}


exports.articles = function(req, res){

    db.Article.find({})
    .then(function(dbArticle){
        
        res.json(dbArticle);
        
    })
    .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
    });

}


// Load new Article into Saved DB.
exports.saveArticle = function(req, res){

    var obj = req.body;


    db.SavedArticle.create({}).then(function(dbSavedArticle){

        return db.Article.findOneAndUpdate({_id: obj.id}, {saved: dbSavedArticle._id}, {new: true});
    })
    .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
    })
    .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
    });

}



// Get all Articles saved
exports.savedArticle = function(req, res){
    
    db.Article.find({saved : {$exists:true}})
    .populate("note","saved")
    .then(function(dbSavedArticle){
        res.json(dbSavedArticle);
    })
    .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
    });
}


exports.deleteSavedArticle = function(req, res){

    var obj = req.body;

    db.SavedArticle.findByIdAndDelete({_id: obj.savedId})
    .then(function(dbUnsaveArticle){
        db.Article.findOneAndUpdate({_id: obj.articleId}, { $unset: {saved: ""}})
        .then(function(dbArticle){
            res.send("it worked");
        })
    })
    .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
    });

}


exports.getNote = function(req, res){
    
    var articleId = req.query.id;


    db.Note.find({article:articleId})
    .populate("article")
    .then(function(dbArticle){
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    })

}


exports.addNote = function(req, res){
    
    var newNote = {};
    var obj = req.body;
    

    newNote.noteContent = obj.newNote;
    newNote.article = obj.articleId;


    db.Note.create(newNote)
    .then(function(dbNote){
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    })
}


exports.updateNote = function(req, res){
    
    var note = req.body;

    db.Note.updateOne({_id: note.noteId}, {noteContent: note.noteContent})
    .then(function(dbNote){
        res.json(dbNote);
    })
    .catch(function(err){
        res.json(err);
    })

}




//  Functions not used below
exports.getNote_old1 = function(req, res){
    
    var articleId = req.query.id;

    db.Article.find({_id:articleId})
    .populate("note")
    .then(function(dbArticle){
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    })
}



// addNote
// addNote_old1
exports.addNote_old1 = function(req, res){


    var obj = req.body;

    const note1 = new db.Note({
        _id: new mongoose.Types.ObjectId(),
        noteContent: obj.newNote,
        article: obj.articleId
    });


    note1.save(function(err){
        if(err) return err;

        db.Article.updateOne({_id: obj.article}, {$push: {note: [note1._id]}})
        .then(function(dbArticle) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
        })

    })


}

// addNote
// addNote_old1
// addNote_old2
exports.addNote_old2 = function(req, res){
    
    var newNote = {};
    var obj = req.body;
    

    newNote.noteContent = obj.newNote;
    newNote.article = obj.articleId;


    db.Note.create(newNote).then(function(dbNote){

        console.log("New Note ID");
        console.log(dbNote._id);
        return db.Article.updateOne({_id: obj.articleId}, {$push: {note: [dbNote._id]}});
    })
    .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    })
}







