
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


exports.index = function (req, res) {
    res.render("index", { msg: "about page" });
};


exports.scrape = function (req, res){

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


