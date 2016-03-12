var ejs = require("ejs");
var mq_client = require('../rpc/client');

exports.getFriends = function(req, res) {
	
	 if (!req.session._id) 
		 res.render("/"); 
	 else
	 {
		var _id = req.session._id;		
		var msg_payload = {
			"_id" : _id
		};

		console.log("Sending data friends list queue:: " + msg_payload);
		mq_client.make_request('friend_list_request', msg_payload, function(err, results) {
			console.log(results);
			if (err) {
				throw err;
			} else {
				if (results.code == 200) {
					console.log("Fetched friends List..");
					res.send(results.friendList);

				} else {
					console.log("Couldnot fetch friends list!");

				}
			}
		});
	}
}


exports.addFriend = function(req, res) {

	if (!req.session._id)
		res.render("/");
	else {
		var _id = req.session._id;
		var friend_id = req.param("friend_id");
		var firstname = req.session.firstname;
		var lastname = req.session.lastname;
		
		var msg_payload = {
			"_id" : _id,
			"friend_id":friend_id,
			"firstname":firstname,
			"lastname":lastname
		};
				
		console.log("Sending Request to RabbitMQ for Adding Friend");
		console.log(msg_payload);
		mq_client.make_request('friend_add_request', msg_payload, function(err, results) {
			console.log(results);
			if (err) {
				throw err;
			} else {
				if (results.code == 200) {
					console.log("Added Friend");
					res.send({
						"message" : "Friend Request Sent!"
					});

				} else {
					console.log("Couldnot fetch friends list!");

				}
			}
		});
	}
}


exports.getUserProfileDetails = function(req, res) {
	 if (!req.session._id) 
		 res.render("/"); 
	 else
	 {
		var _id = req.session._id;
		var msg_payload = {
			"_id" : _id
		};
		console.log("Sending data to user queue" + msg_payload);
		mq_client.make_request('user_queue_request', msg_payload, function(err,
				results) {
			console.log(results);
			if (err) {
				throw err;
			} else {
				if (results.code == 200) {
					console.log("Valid Login");
					res.render("displayUserProfile", {
						user_id : results.user._id,
						firstname : results.user.firstname,
						lastname : results.user.lastname
					});
					// res.send({"login":"Success"});
				} else {
					console.log("Invalid Login");
					// res.send({"login":"Fail"});
				}
			}
		});
	}
};

exports.editUserProfile = function(req, res) {
	if (!req.session._id)
		res.render("/");
	else {
		var _id = req.session._id;
		var msg_payload = {
			"_id" : _id
		};
		mq_client.make_request('user_queue_request', msg_payload, function(err,
				results) {
			console.log(results);
			if (err) {
				throw err;
			} else {
				if (results.code == 200) {
					console.log("In Edit Profile");
					res.render("editProfile", {
						user_id : results.user._id,
						firstname : results.user.firstname,
						lastname : results.user.lastname
					});
				} else {
					console.log("Error in fetching!");
				}
			}
		});
	}
};

exports.updateAbout = function(req, res) {

	if (!req.session._id) 
		 res.render("/"); 
	 else
 	 {
		var _id = req.session._id;

		var fromcity = req.body.fromcity;
		var currentcity = req.body.currentcity;

		var about = req.body.about;
		var work = req.body.work;

		var education = req.body.education;
		var contact = req.body.contact;

		var sports = req.body.sports;
		var music = req.body.music;
		var interests = req.body.interests;

		var msg_payload = {

			"_id" : _id,
			"fromcity" : fromcity,
			"currentcity" : currentcity,
			"about" : about,
			"work" : work,
			"education" : education,
			"contact" : contact,
			"sports" : sports,
			"music" : music,
			"interests" : interests
		};

		mq_client.make_request('update_about_queue', msg_payload, function(err,
				results) {
			console.log("RESULTS:" + results);
			if (err) {
				throw err;
			} else {
				if (results.code == 200) {
					console.log("Updated About!");
					res.send({
						"message" : "Details Updated!"
					});
				} else {
					console.log("Error in fetching!");
				}
			}
		});
	}
};

//Get Pending Friends..
exports.getPendingFriends = function(req, res) {

	if (!req.session._id)
		res.render("/");
	else {
		var _id = req.session._id;		
		var msg_payload = {
			"_id" : _id
		};

		console.log("Sending data to pending friends list queue:: "
				+ msg_payload);
		mq_client.make_request('pending_friend_list_request', msg_payload,
				function(err, results) {
					console.log(results);
					if (err) {
						throw err;
					} else {
						if (results.code == 200) {
							console.log("Fetched friends List..");
							res.send(results.pendingFriendList);

						} else {
							console.log("Couldnot fetch friends list!");

						}
					}
				});
	}
}

exports.getAbout = function(req, res) {
	if (!req.session._id)
		res.render("/");
	else {
		var _id = req.session._id;
		var msg_payload = {
			"_id" : _id
		};

		mq_client.make_request('user_queue_request', msg_payload, function(err,
				results) {
			console.log(results);
			if (err) {
				throw err;
			} else {
				if (results.code == 200) {
					console.log("Fetching About Information"+ results.user.firstname);
					res.send(results.user);
				} else {
					console.log("Error in fetching!");
				}
			}
		});
	}
}

exports.searchAll = function(req, res) {
	
	if (!req.session._id)
		res.render("/");
	else {
		var firstname = req.param("searchQuery");
		var _id = req.session._id;
		var msg_payload = {
			"firstname" : firstname,
			"_id" : _id
		};

		console.log("Sending search query for Search Friend");
		mq_client.make_request('search_request_queue', msg_payload, function(
				err, results) {
			console.log(results);
			if (err) {
				throw err;
			} else {

				if (results.code == 200) {

					console.log("Fetching About Information" + results);
					res.send(results.nonFriends);

				} else {
					console.log("Error in fetching!");
				}
			}
		});
	}
}

exports.acceptFriendRequest = function(req,res) {

	if (!req.session._id)
		res.render("/");
	else {
		var _id = req.session._id;
		var friend_id = req.param("friend_id");
		var firstname = req.param("firstname");
		var lastname = req.param("lastname");
		
		var msg_payload = {
			"_id" : _id,
			"friend_id":friend_id,
			"firstname":firstname,
			"lastname":lastname
		};
				
		console.log("Sending Request to RabbitMQ for Accepting Friend Request");
		console.log(msg_payload);
		mq_client.make_request('friend_accept_request', msg_payload, function(err, results) {
			console.log(results);
			if (err) {
				throw err;
			} else {
				if (results.code == 200) {
					console.log("Added Friend");
					res.send({
						"message" : "Friend Request Sent!"
					});

				} else {
					console.log("Couldnot Add Friend!");

				}
			}
		});
	}
	
}