var Campground = require("../models/campground");
var Comment = require("../models/comment");

var midlewareObj = {};
midlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			req.flash("error", "Campground not found");
			res.redirect("back");
		} else {
			
			if(!foundCampground){
				req.flash("error", "Item not found");
				return res.redirect("back")
			}
			
			if(foundCampground.author.id.equals(req.user._id)){
				next();	
			} else {
				req.flash("error", "You dont have permission to do that");
				res.redirect("back");
			}	
		}
	});		
	} else {
		req.flash("error", "You dont have permission to do that");
		res.redirect("back");
	}
}

midlewareObj.checkCommentOwnership = function(req, res, next){
		if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else {
			
			if(foundComment.author.id.equals(req.user._id)){
				next();	
			} else {
				req.flash("error", "You dont have permission to do that");
				res.redirect("back");
			}
		 		
		}
	});		
	} else {
		res.redirect("back");
	}
}

midlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} 
	req.flash("error", "Please Login First");
	res.redirect("/login");
}

module.exports = midlewareObj;