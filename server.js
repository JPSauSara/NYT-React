// Require our dependencies
const express = require("express");
const mongoose = require("mongoose");
const expressHandlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const logger = require('morgan');

// Set up our port to be either the host's designated port, or 3000
const PORT = process.env.PORT || 3000;



// Instantiate our Express App
const app = express();

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));



// Set up an Express Router
const router = express.Router();

// Require our routes file pass our router object
require("./config/routes")(router);

// Designate our public folder as a static directory
app.use(express.static(__dirname + "/public"));

// Connect Handlebars to our Express app
app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Use bodyParser in our app
app.use(bodyParser.urlencoded({
  extended: false
}));

// Have every request go through our router middleware
app.use(router);

// Database configuration with mongoose
const URI = 'mongodb://heroku_sxpthk74:g0oe9omnma0jd12km2dvcjlaba@ds145312.mlab.com:45312/heroku_sxpthk74';
mongoose.Promise = global.Promise;
mongoose.connect(URI || "mongodb://localhost/nytreact" );
const db = mongoose.connection;

db.on("error", (error) => {
  console.log("Mongoose Error: ", error);
});

// Once looged into the db through mongoose, log a success message
db.once("open", () => {
  console.log("Mongoose connection successful.")
});



// If deployed, use the deployed database. Otherwise use the local nytreact database
// const db = process.env.MONGODB_URI || "mongodb://localhost/nytreact";

// // Connect mongoose to our database
// mongoose.connect(db, function(error) {
//   // Log any errors connecting with mongoose
//   if (error) {
//     console.log(error);
//   }
//   // Or log a success message
//   else {
//     console.log("mongoose connection is successful");
//   }
// });

// Listen on the port
app.listen(PORT, function() {
  console.log("Listening on port:" + PORT);
});
