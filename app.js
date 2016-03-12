/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , login = require('./routes/login')
  , home = require('./routes/home')
  , posts = require('./routes/posts')
  , groups = require('./routes/groups')
  , http = require('http')
  , path = require('path');


//var passport = require('passport');
var mongoSessionConnectURL = "mongodb://localhost:27017/sessions";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");
var bcrypt = require('bcrypt');

var app = express();
/*app.use(passport.initialize());
app.use(passport.session());*/

app.use(expressSession({
	secret: 'cmpe273_teststring',
	resave: true,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));

var login = require("./routes/login");
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/homepage',login.redirectToHomepage);
app.post('/logout',login.logout);

app.get('/userProfile/:user_id',home.getUserProfileDetails);
app.get('/editProfile',home.editUserProfile);
app.get('/createGroups',groups.getGroups);

app.post('/addFriend',home.addFriend);
app.post('/checklogin', login.checkLogin);
app.post('/signup',login.signup);
app.post('/updateAbout',home.updateAbout);
app.post('/getAbout',home.getAbout);
app.post('/getFriends',home.getFriends);
app.post('/getPendingFriends',home.getPendingFriends);
app.post('/searchAll',home.searchAll);
app.post('/acceptFriendRequest',home.acceptFriendRequest);
app.post('/getAllPosts',posts.getAllPosts);
app.post('/getMyPosts',posts.getMyPosts);
app.post('/postStatus',posts.postStatus);
app.post('/createGroup',groups.createGroup);
app.post('/deleteGroup',groups.deleteGroup);
app.post('/getAllGroups',groups.getAllGroups);
app.post('/getGroupMembers',groups.getGroupMembers);
app.post('/searchGroup',groups.searchGroup);
app.post('/addToGroup',groups.addToGroup);
app.post('/deleteFromGroup',groups.deleteFromGroup);

//connect to the mongo collection session and then createServer
mongo.connect(mongoSessionConnectURL, function(){
	console.log('Connected to mongo at: ' + mongoSessionConnectURL);
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});  
});