var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/index");

//index show allCampgrounds
router.get("/", function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if (err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
		}
	});
});

//create - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){ 
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description
		var author = {
		id: req.user._id,
		username: req.user.username
	}
		
	var newCampground = {name: name,
						 image: image,
						 description: desc,
						author: author
						}

	
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});

//show form
router.get("/new", middleware.isLoggedIn,  function(req, res){ 
	res.render("campgrounds/new", {currentUser: req.user});
	
});
 
//Show - more info about one campground
router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/show", {campground: foundCampground, currentUser: req.user});
		}
	});
})

//Edit form Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){ 
	Campground.findById(req.params.id, function(err, foundCampground){
		
		res.render("campgrounds/edit", {campground: foundCampground});	
	});		
});

//Update Campground Route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){ 
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//Destroy Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	var comments = [];
    Campground.findById(req.params.id, function(err, foundCampground){
		foundComments = foundCampground.comments;		
	}) 
	
	Campground.findByIdAndDelete(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else {
			foundComments.forEach(function(comment){
				Comment.findByIdAndDelete(comment, function(err){
					if(err){
						console.log(err);
					}
				});
			});
			res.redirect("/campgrounds")
		}
	
	});
});

module.exports = router;