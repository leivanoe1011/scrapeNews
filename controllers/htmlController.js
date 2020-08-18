
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


mongoose.connect('mongodb://localhost/nyTimesArticleScrapper', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


var exports = module.exports = {};


exports.index = function (req, res) {
    res.render("index", { msg: "about page" });
};


exports.scrape = function (req, res){

    var url = "https://www.nytimes.com";

    console.log(url);

    // First, we grab the body of the html with axios
    axios.get(url).then(function(response) {

        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
        // Now, we grab every h2 within an article tag, and do the following:
        
        // Now, we grab every h2 within an article tag, and do the following:
        $("article").each(function(i, element) {
            // Save an empty result object
            var result = {};


            if($(element).children().text() === "" || $(element).find("a").attr("href") === undefined){
                return;
            }


            result.title = ($(element).children().text() === "") ? "NA" : $(element).children().text() ;
            result.link = ($(element).find("a").attr("href") === undefined) ? "NA" : $(element).find("a").attr("href") ;


            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
            .then(function(dbArticle) {
                // View the added result in the console
                // console.log("Response after load")

            })
            .catch(function(err) {
                // If an error occurred, log it
                console.log(err);
            });
        });
        // Send a message to the client
        res.send("Scrape Complete");
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


