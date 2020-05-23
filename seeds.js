var mongoose  	= require("mongoose");
var Campground  = require("./models/campground");
var Comments	= require("./models/comment");

var seeds = [
	{
		name: "Desert Storm",
		image: "https://images.unsplash.com/photo-1588788839689-132558996bea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Mountain of sand"
	},
	{
		name: "The coldness madness",
		image: "https://images.unsplash.com/photo-1589007015668-202c034630ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Freezing tree asking for help"
	},
	{
		name: "Flower field",
		image: "https://images.unsplash.com/photo-1588874728564-1f7fd306e8c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Calm flower in the flower field"
	}
];

function seedDB(){
	Campground.remove({}, function(err){
	// 	if(err){
	// 		console.log(err);
	// 	}
	// 	console.log("removed campground");
	// 	seeds.forEach(function(seed){
	// 		Campground.create(seed, function(err, campground){
	// 			if(err){
	// 				console.log(err);
	// 			} else{
	// 				console.log("added to campground");
	// 				Comments.create(
	// 				{
	// 					text: "This place is great, but I wish there was internet",
	// 					author: "Hommer"
	// 				}, function(err, comment){
	// 					if(err){
	// 						console.log(err);
	// 					} else{
	// 						campground.comments.push(comment);
	// 						campground.save();
	// 						console.log("Created new comment")
	// 					}
	// 				});
	// 			}
	// 	});
	// });
	});
}

module.exports = seedDB;