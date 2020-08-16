
// Dependencies
var express = require("express");
// var mongojs = require("mongojs");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");


var PORT = process.env.PORT || 3001;


// Middleware
// Extended will allow our Request variable within our Routers
// to access form inputs
app.use(express.urlencoded({ extended: true }));

// Middleware below allows the app to parse JSON
app.use(express.json());

// The Middleware below will begin reading the files from the 
// Public Directory
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main" // Server will read main.handlebars firstß
  })
);

app.set("view engine", "handlebars");


// Starting the server, syncing our models ------------------------------------/
models.sequelize.sync().then(function () {
    app.listen(PORT, function () {
      console.log("listening on port: " + PORT);
    });
  });
  
module.exports = app;

