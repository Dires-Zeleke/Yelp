var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose	= require("mongoose"),
	passport	= require("passport"),
	localStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	flash		= require("connect-flash"),
	Campground	= require("./models/campground"),
	Comment		= require("./models/comment"),
	User		= require("./models/user"),
	seedDB		= require("./seeds");

//requiring routes
var  commentRoutes 		= require("./routes/comments"),
	 campgroundRoutes 	= require("./routes/campgrounds"),
	 indexRoutes 		= require("./routes/index");

app.use(express.static("public/stylesheet"));
mongoose.set('useNewUrlParser',true)
mongoose.connect("mongodb://localhost:27017/yelpcamp")
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

//passport config
app.use(require("express-session")({
	secret: "no secret",
	resave: false,
	saveUninitialize: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success")
	
	next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(3000, function(){
	console.log("YelpCam Started");
});



