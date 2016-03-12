var ejs = require("ejs");
var mq_client = require('../rpc/client');
var bcrypt = require('bcrypt');

exports.checkLogin = function(req,res) {
	var username = req.param("username");
	var password = req.param("password");

	//password
	var msg_payload = { "email": username, "password": password };	
	console.log("In POST Request = UserName:" + username + " " + password);	

	mq_client.make_request('login_queue',msg_payload, function(err,results) {		
		if(err) {
			throw err;
		}
		else {
			console.log("After Queue::" + results.code);
			if(results.code == 200)	{				
				if(bcrypt.compareSync(password, results.password) == true) {
					req.session._id = results._id;
					req.session.firstname = results.firstname;
					req.session.lastname = results.lastname;
					console.log("Valid Login");						
					res.send({"login":"Success"});	
				} else {
					console.log("Invalid Login - Password Mismatch");
					res.send({"login":"Fail"});
				}		
			}
			else {    				
				console.log("Invalid Login");
				res.send({"login":"Fail"});
			}
		}  
	});	
};

//Redirects to the homepage
exports.redirectToHomepage = function(req,res){	
	res.render("homepage");
};

//Signup
exports.signup = function(req,res) {
	console.log("In POST Request = First Name:" + req.body.signupDetails.firstname + " " + req.body.signupDetails.lastname);
	//Encryption
	//var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(req.body.signupDetails.password,10);
	var msg_payload = {firstname: req.body.signupDetails.firstname, lastname:req.body.signupDetails.lastname , email:req.body.signupDetails.email, password:hash,dob:req.body.signupDetails.dob,gender:req.body.signupDetails.gender,doj:new Date()};
	mq_client.make_request('signup_queue',msg_payload, function(err,results){		
		console.log(results);
		if(err) {
			throw err;
		}
		else {
			if(results.code == 200)	{
				console.log("Successfully Inserted!");				
				res.send({"status":"User Inserted!"});
			}
			else {
				console.log("Could not Insert User details..");				
				res.send({"status":"User Not Inserted!"});
			}
		}  
	});	
}

//Logout the user - invalidate the session
exports.logout = function(req,res) {
	req.session.destroy();
	res.redirect('/');
};