
// Dependencies
var express = require("express");

var exphbs = require("express-handlebars");

// Passport
// import the passport module and the express-session, 
// both of which we need to handle authentication
var passport = require("passport");

// passport has to save a user ID in the session 
// and it uses this to manage retrieving the user details when needed
var session = require("express-session");

var flash = require("connect-flash");

// This extracts the entire body part of an incoming 
// request and exposes it in a format that is easier to work with. 
// In this case, we will use the JSON format.
var bodyParser = require('body-parser');


var PORT = process.env.PORT || 3001;


var app = express();


// Middleware
// Extended will allow our Request variable within our Routers
// to access form inputs
app.use(express.urlencoded({ extended: true }));

// Middleware below allows the app to parse JSON
app.use(express.json());

// The Middleware below will begin reading the files from the 
// Public Directory
app.use(express.static("public"));


// express session and passport session add them both as middleware.
// session secret
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions\

app.use(flash());



// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main" // Server will read main.handlebars firstß
  })
);

app.set("view engine", "handlebars");


// // Starting the server, syncing our models ------------------------------------/
// models.sequelize.sync().then(function () {
//     app.listen(PORT, function () {
//       console.log("listening on port: " + PORT);
//     });
//   });

// require("./routes/htmlRoutes")(app,passport);

require("./routes/htmlRoutes")(app);


  
app.listen(PORT, function () {
    console.log("listening on port: " + PORT);
});


// module.exports = app;


