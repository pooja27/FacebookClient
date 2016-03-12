/**
 * New node file
 */
//loading the 'login' angularJS module
var facebook = angular.module('facebook',[]);
//defining the login controller
facebook.controller('LoginController', function($scope,$http,$window) 
{
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false
	$scope.invalid_login = true;
	$scope.unexpected_error = true;
	$scope.loginForm = {};	
	$scope.signUpForm = {};
	$scope.invalid_login = true;
	$scope.unexpected_error = true;
	$scope.invalid_signup = true;
	$scope.valid_signup = true;
	$scope.unexpected_error_signup = true;
	
	//checking login
	$scope.checkloginfunc = function() {
		$http({
			method : "POST",
			url : '/checklogin',
			data : {
				"username" : $scope.loginForm.email,
				"password" : $scope.loginForm.password
			}
		}).success(function(data) {
			console.log("in login Controller");
			if (data.login == "Success")
				window.location = '/homepage';
			else {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
			}
		}).error(function(error) {
			console.log("in login Controller Fail");
			$scope.unexpected_error = true;
			$scope.invalid_login = false;
		});
	};
	
	//signing up the new user
	$scope.signup = function() {
		
		$http({
			method : "POST",
			url : '/signup',
			data : {
				"signupDetails" : $scope.signUpForm
			}
		}).success(function(data) {			
			if (data.status == "User Inserted!") {
				$scope.invalid_signup = true;
				$scope.valid_signup = false;
				$scope.unexpected_error_signup = true;
			}
			else		
			{				
				$scope.invalid_signup = false;
				$scope.valid_signup = true;
				$scope.unexpected_error_signup = true;
			}
		}).error(function(error){
			$scope.invalid_signup = true;
			$scope.valid_signup = true;
			$scope.unexpected_error_signup = false;
		});
		
	};
	
	$scope.displayMyProfile = function() {		
		window.location.assign("/showUserProfile/" + "-1");		
	}
});