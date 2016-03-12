var ejs = require("ejs");
var mq_client = require('../rpc/client');

exports.getAllPosts = function(req,res) {
	if (!req.session._id)
		res.render("/");
	else {
		var _id = req.session._id;
		var msg_payload = {
			"_id" : _id,
		};
		console.log("Sending Request to RabbitMQ for Retrieving Posts ");
		console.log(msg_payload);
		
		mq_client.make_request('getPosts_request', msg_payload, function(err, results) {
			console.log(results.newsFeedList);
			if (err) {
				throw err;
			} else {
				if (results.code == 200) {
					console.log("Got all the posts" + results.newsFeedList);
					res.send({"newsFeedList":results.newsFeedList});
				} else {
					console.log("Couldnot Add Friend!");
				}
			}
		});
	}	
}

exports.getMyPosts = function(req,res) {
	if (!req.session._id)
		res.render("/");
	else {
		var _id = req.session._id;
		
		var msg_payload = {
			"_id" : _id,
		};				
		console.log("Get My Posts!");
		console.log(msg_payload);
		mq_client.make_request('get_my_posts_request', msg_payload, function(err, results) {
			console.log(results.myNewsFeedList);
			if (err) {
				throw err;
			} else {
				if (results.code == 200) {
					res.send({ "myNewsFeedList" : results.myNewsFeedList	});
				} else {
					console.log("");
				}
			}
		});
	}	
}

exports.postStatus  = function(req,res){
	if (!req.session._id)
		res.render("/");
	else {
		var _id = req.session._id;		
		var msg_payload = { "_id" : _id,"details" : req.param("details")};				
		
		console.log("Post My Status");
		console.log(msg_payload);
		
		mq_client.make_request('post_my_post_status', msg_payload, function(err, results) {			
			if (err) {
				throw err;
			} else {
				if (results.code == 200) {
					console.log("Successfully Posted the Status!");
					res.end();
				} else {
					console.log("");
				}
			}
		});
	}	
} 