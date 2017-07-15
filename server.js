// Require our dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require('morgan');

// Require Article Schema
const Article = require("./models/Articles");

// Instantiate our Express App
const app = express();

// Set up our port to be either the host's designated port, or 3000
const PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Designate our public folder as a static directory
app.use(express.static(__dirname + "/public"));

// -------------------------------------------------

// Set up an Express Router
const router = express.Router();

// Require our routes file pass our router object
require("./config/routes")(router);


// Have every request go through our router middleware
app.use(router);

// Database configuration with mongoose
	// To remove Mongoose mpromise depreciation warning
	mongoose.Promise = global.Promise;

const URI = 'mongodb://heroku_sxpthk74:g0oe9omnma0jd12km2dvcjlaba@ds145312.mlab.com:45312/heroku_sxpthk74';
mongoose.connect(URI || "mongodb://localhost/nytreact" );
// mongoose.connect('mongodb://heroku_sxpthk74:g0oe9omnma0jd12km2dvcjlaba@ds145312.mlab.com:45312/heroku_sxpthk74' || "mongodb://localhost/nytreact");
const db = mongoose.connection;

db.on("error", (error) => {
  console.log("Mongoose Error: ", error);
});

// Once looged into the db through mongoose, log a success message
db.once("open", () => {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------


// Listen on the port
app.listen(PORT, function() {
  console.log("Listening on port:" + PORT);
});
