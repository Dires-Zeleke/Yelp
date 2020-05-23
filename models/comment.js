var mongoose = require("mongoose");

var commentsSchema = mongoose.Schema({
	text: String,
	author: {
		id:{
			type: mongoose.Schema.Types.ObjectID,
			ref: "User"
		},
		username: String
			}
});

module.exports = mongoose.model("Comment", commentsSchema);