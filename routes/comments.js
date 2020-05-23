var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/index");

//Create new
router.get("/new", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else{
			res.render("./comments/new", {campground: campground, currentUser: req.user });
		}
	});
	
});

//Create
router.post("/", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {	
			Comment.create(req.body.comment, function(err, com){
				if(err){
					console.log(err);
				} else{
					//add username and id to comments
					com.author.id = req.user._id;
					com.author.username = req.user.username;
					com.save();
					foundCampground.comments.push(com);
					foundCampground.save();
					console.log(com);
					req.flash("success", "Successfully added Comment")
					res.redirect("/campgrounds/"+req.params.id);
				}		
			});
		}
	});		
});

//Edit comments form
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){ 
	
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else {
		res.render("./comments/edit", {campground_id: req.params.id, comment:foundComment});	
		}
	});
});

//Comments Update
router.put("/:comment_id", middleware.checkCommentOwnership,  function(req, res){ 
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		} else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

//Destroy 
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){ 
	Comment.findByIdAndDelete(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else{
			req.flash("success", "Comment deleted")
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

module.exports = router;