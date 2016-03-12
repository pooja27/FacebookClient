var ejs = require("ejs");
var mq_client = require('../rpc/client');

exports.createGroup = function(req, res) {
	//Validating the session
	if (!req.session._id)
		res.render("/");
	else {
		var _id = req.session._id;
		var groupName = req.param("groupName");
	
		
		var msg_payload = {
			"_id" : _id,
			"groupName":groupName
		};
				
		console.log("Sending Request to RabbitMQ for Creating Group!");
		console.log(msg_payload);
		mq_client.make_request('group_add_request', msg_payload, function(err, results) {
			console.log(results);
			if (err) {
				throw err;
			} else {
				if (results.code == 200) {
					console.log("Added Group");
					res.send({
						"message" : "GroupCreated!"
					});

				} else {
					console.log("Couldnot create group!");
				}
			}
		});
	}
}

exports.getAllGroups = function(req, res) {
	//Validating the session
	if (!req.session._id)
		res.render("/");
	else {
		var _id = req.session._id;
		var groupName = req.param("groupName");
		var msg_payload = {
			"_id" : _id,
			"groupName":groupName
		};
				
		console.log("Sending Request to RabbitMQ for Getting all Groups!");
		console.log(msg_payload);
		mq_client.make_request('get_all_group_request', msg_payload, function(err, results) {
			console.log(results);
			if (err) {
				throw err;
			} else {
				if (results.code == 200) {
					console.log(results.groupList);
					res.send({"groupList" : results.groupList});

				} else {
					console.log("Couldnot create group!");
				}
			}
		});
	}
}

exports.deleteGroup = function(req, res) {
	//Validating the session
	if (!req.session._id)
		res.render("/");
	else {
		var _id = req.session._id;
		var group_id = req.param("group_id");
	
		
		var msg_payload = {
			"_id" : _id,		
			"group_id" :group_id
		};
				
		console.log("Sending Request to RabbitMQ for deleting Group!");
		console.log(msg_payload);
		mq_client.make_request('group_delete_request', msg_payload, function(err, results) {
			console.log(results);
			if (err) {
				throw err;
			} else {
				if (results.code == 200) {
					console.log("Group Deleted");
					res.send({
						"message" : "Group Deleted!"
					});

				} else {
					console.log("Couldnot delete group!");

				}
			}
		});
	}
}

exports.getGroups = function(req,res) {
	res.render("createGroups");
}

exports.getGroupMembers = function(req,res) {
	//Validating the session
	if (!req.session._id)
		res.render("/");
	else {		
		var group_id = req.param("group_id");		
		var msg_payload = {			
			"group_id" :group_id
		};
				
		console.log("Sending Request to RabbitMQ for Fetching Group Members!");
		console.log(msg_payload);
		
		mq_client.make_request('group_members_request', msg_payload, function(err, results) {			
		
			if (err) {
				throw err;
			} else {
				if (results.code == 200) {
					console.log("Group Deleted");
					res.send({
						"groupMembersList" : results.groupMembersList
					});

				} else {
					console.log("Couldnot delete group!");

				}
			}
		});
	}
}

exports.searchGroup = function(req,res) {
	//Validating the session
	if (!req.session._id)
		res.render("/");
	else {		
		var firstname = req.param("firstname");		
		var msg_payload = {			
			"firstname" :firstname
		};
				
		console.log("Sending Request to RabbitMQ for Searching Group Members!");
		console.log(msg_payload);
		
		mq_client.make_request('group_members_search_request', msg_payload, function(err, results) {		
			if (err) {
				throw err;
			} else {
				if (results.code == 200) {
					console.log("Group Deleted");
					res.send({
						"allFriendsList1" : results.members
					});

				} else {
					console.log("Couldnot Search for members in group!");

				}
			}
		});
	}
}

exports.addToGroup = function(req,res) {
	//Validating the session
	if (!req.session._id)
		res.render("/");
	else {		
		var firstname = req.param("firstname");
		var lastname = req.param("lastname");
		var _id = req.param("_id");
		var group_id = req.param("group_id");
		
		var msg_payload = {
			"_id" : _id,
			"firstname" :firstname,
			"lastname":lastname,
			"group_id":group_id
		};
				
		console.log("Sending Request to RabbitMQ for Adding to Group Members!");
		console.log(msg_payload);
		
		mq_client.make_request('group_members_add_request', msg_payload, function(err, results) {		
			if (err) {
				throw err;
			} else {
				if (results.code == 200) {
					console.log("Group Member Added");
					res.send({
						"message" : "Group Member Added"
					});
				} else {
					console.log("Couldnot add member in group!");
				}
			}
		});
	}
}

exports.deleteFromGroup= function(req,res) {
	//Validating the session
	if (!req.session._id)
		res.render("/");
	else {		

		var member_id = req.param("member_id");
		var _id = req.param("group_id");

		var msg_payload = {
			"_id" : _id,			
			"member_id":member_id
		};
				
		console.log("Sending Request to RabbitMQ for Deleting from Group Members!");
		console.log(msg_payload);		
		mq_client.make_request('group_members_delete_request', msg_payload, function(err, results) {		
			if (err) {
				throw err;
			} else {
				if (results.code == 200) {
					console.log("Group Member Deleted");
					res.send({
						"message" : "Group Member Deleted"
					});
				} else {
					console.log("Couldnot delete member in group!");
				}
			}
		});
	}
}