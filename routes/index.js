var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");



//root route
router.get("/", function(req, res){
	res.render("landing")	
});

//register form
router.get("/register", function(req, res){
	res.render("register");
});

//Signup logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			return res.redirect("/register");
		} else {
			passport.authenticate("local")(req, res, function(){
				req.flash("success", "Welcome to YelpCamp " + user.username);
				res.redirect("/campgrounds");
			});
		}
	});
});

//login form
router.get("/login", function(req, res){
	res.render("login");	
});

//login logic

router.post("/login", passport.authenticate("local", 
	{
	successRedirect: "/campgrounds",
		failureRedirect: "/login"
		}), function(req, res){
	// req.flash("success", "you logged in")
	
});

//logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "You loged out");
	res.redirect("/campgrounds");
});

module.exports = router;