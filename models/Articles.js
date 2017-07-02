// Require mongoose
const mongoose = require("mongoose");

// Create a schema class using mongoose's schema method
const Schema = mongoose.Schema;

// Create the ArticleSchema with our schema class
const ArticleSchema = new Schema({
	title: {
		type: String
	},
	date: {
		type: Date
	},
	url: {
		type: String
	}
});

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;