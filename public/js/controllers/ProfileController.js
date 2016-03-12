(function () {
    'use strict';
    var app= angular.module('facebook');
    app.controller('ProfileController', ['$scope','$http',function ($scope,$http) {
   	   	$scope.myForm = {};
    	$scope.aboutForm = {};
    	$scope.aboutInfo = {};
        $scope.message = "";
        $scope.friendList = [];
        $scope.pendingFriendList = [];
        $scope.myNewsFeedList = [];
        $scope.groupName = "";
        $scope.groupList = [];
        //this.allFriendsList = [];
        this.search1 = "";
        $scope.groupSelectedName = "";
        $scope.groupId = "";
                
        this.tab = 1;
        
    	this.selectedTab = function(setTab) {
    		this.tab = setTab;		
    	}
    	
    	this.isSelected = function(checkTab) {
    		return this.tab === checkTab;
    	}
        
    	$scope.postsByFriends = function() {
            var posting = $http({
                method: 'POST',          
                url: '/getAllPosts',                
                processData: false
            }).success(function (response) {
            	console.log("Get All Posts!");
            	console.log(response);
                $scope.newsFeedList = response.newsFeedList;            
            });         
    	}
    	
    	$scope.postsByMe= function() {
            var posting = $http({
                method: 'POST',          
                url: '/getMyPosts',                
                processData: false
            }).success(function (response) {
            	console.log("Get All Posts!");
            	console.log(response.myNewsFeedList);
                $scope.myNewsFeedList = response.myNewsFeedList;            
            });         
    	}
    	
    	$scope.postStatus = function() {
            var posting = $http({
                method: 'POST',          
                url: '/postStatus',                
                processData: false,
                data: {
                	"details":$scope.postDetails
                }
            }).success(function (response) {
            	console.log("Posted!");
            	$scope.postsByFriends();            	
            });         
    	}
    	
    	//Update About
    	$scope.updateAbout = function() {    		
            var posting = $http({
                method: 'POST',          
                url: '/updateAbout',
                data: $scope.aboutForm,
                processData: false
            }).success(function (response) {            	
                $scope.message = response.message;            
            });         
        }     
    	//Get About
    	$scope.getAbout = function(_id) {    		
            var posting = $http({
                method: 'POST',          
                url: '/getAbout',
                data: $scope._id,
                processData: false
            }).success(function (response) { 
            	console.log(response);
            	$scope.aboutInfo = response;                           
            });         
        }     
    	
    	$scope.loadFriendList = function() {
    		var posting = $http({	
    			method : 'POST',			
    			url : '/getFriends',
    			data : {
    				
    			}
    		}).success(function(response) {    			
    			$scope.friendList = response;			        
    		});
    	}
    	
    	$scope.loadPendingFriendList = function() {
    		console.log("$scope.user_id:: " + $scope.user_id);
    		var posting = $http({
    			method : 'POST',			
    			url : '/getPendingFriends',
    			data : {
    				"_id" : $scope.user_id
    			}
    		}).success(function(response) {    			
    			$scope.pendingFriendList = response;			        
    		});
    	}
    	
    	$scope.searchFunc = function(){
    		
    		$scope.search1 = this.search1;
    		
    		var x ;
    		var searchStmt = $http({
    			method : 'POST',			
    			url : '/searchAll',
    			data: {
    				"searchQuery":$scope.search1
    			}
    		}).success(function(response) {
    			$scope.allFriendsList = response;	
    			console.log($scope.allFriendsList);
    			
    		});    		
    	}
    	
    	$scope.loadPendingFriendList = function() {
    		console.log("$scope.user_id:: " + $scope.user_id);
    		var posting = $http({
    			method : 'POST',			
    			url : '/getPendingFriends',
    			data : {
    				
    			}
    		}).success(function(response) {    			
    			$scope.pendingFriendList = response;			        
    		});
    	}    	
    	
    	$scope.addFriend = function(friend_id,firstname,lastname) {
    		var addFriend = $http({
    			method : 'POST',			
    			url : '/addFriend',
    			data: {
    				"friend_id":friend_id,
    				"firstname":firstname,
    				"lastname":lastname
    				
    			}
    		}).success(function(response) {
    			$scope.messageAddFriend = "Sent Friend Request";
    			
    		});
    	}
    	
    	$scope.acceptFriend = function(_id,firstname,lastname,isAccept){
    		alert("acceptFriendRequest");
    		var addFriend = $http({
    			method : 'POST',			
    			url : '/acceptFriendRequest',
    			data: {
    				"friend_id":_id,
    				"firstname":firstname,
    				"lastname": lastname,
    				"isAccept" :isAccept    				
    			}
    		}).success(function(response) {
    			$scope.messageAccepted = "Friend Added!";    			
    		});
    	}

    	//All about Groups
    	
    	//Creating Groups
    	$scope.createGroup = function() {
    		console.log("Creating Group");
    		var addFriend = $http({
    			method : 'POST',			
    			url : '/createGroup',
    			data: {    				
    				"groupName" :$scope.groupName    				
    			}
    		}).success(function(response) {
    			$scope.groupDeletion = "Group Added!";    			
    		});
    	}
    	
    	//Deleting Groups
    	$scope.deleteGroup = function(_id) {
    		console.log("Deleting Group" + _id);
    		var addFriend = $http({
    			method : 'POST',			
    			url : '/deleteGroup',
    			data: {    				
    				"group_id" :_id    				
    			}
    		}).success(function(response) {
    			$scope.groupDeletion = "Group Deleted!";    			
    		});
    	}
    	
    	//Getting All Groups
    	$scope.getAllGroupsFunc = function() {
    		console.log("Getting Group Members");
    		var getGroups = $http({
    			method : 'POST',			
    			url : '/getAllGroups'    			
    		}).success(function(response) {
    			console.log("Response:: " + response.groupList[0]._id);
    			$scope.groupList = response.groupList;    			
    		}); 		
    	}    	
    	
    	//Get All Group Members
    	$scope.selectGroup = function(id,name){	
    		alert("ID" + id);
    		alert("Name" + name);
    		$scope.groupSelectedName = name;
    		$scope.groupId = id;
    		var searchStmt = $http({
    			method : 'POST',			
    			url : '/getGroupMembers',
    			data: {
    				"group_id":id
    			}
    		}).success(function(response) {			
    			$scope.groupMembersList = response.groupMembersList;    			
    		});
    	}
    	
    	$scope.searchMember = function() {
    		alert("Searching " + $scope.search);
    		var searchStmt = $http({
    			method : 'POST',			
    			url : '/searchGroup',
    			data: {
    				"firstname":$scope.search
    			}
    		}).success(function(response) {			
    			$scope.allFriendsList1 = response.allFriendsList1;			
    		});
    	}
    	
    	$scope.deleteMember = function(group_id,member_id) {
    		var searchStmt = $http({
    			method : 'POST',			
    			url : '/deleteFromGroup',
    			data: {
    				"group_id":$scope.groupId,
    				"member_id":member_id
    			}
    		}).success(function(response) {			
    			$scope.memberDeletion = response.message;	
    		});
    	}
    	
    	$scope.addToGroup = function(member_id,firstname,lastname) {
    		var searchStmt = $http({
    			method : 'POST',			
    			url : '/addToGroup',
    			data: {
    				"group_id":$scope.groupId,
    				"firstname":firstname,
    				"lastname":lastname,
    				"_id":member_id
    			}
    		}).success(function(response) {			
    			$scope.memberAddition = response.message;
    			$scope.selectGroup();
    		});
    	}
    	
   }]);
}());