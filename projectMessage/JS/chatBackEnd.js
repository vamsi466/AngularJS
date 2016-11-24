localStorage.chatDatabase = (localStorage.chatDatabase != undefined)?localStorage.chatDatabase : '{"users" : []}';
var chatDatabase = JSON.parse(localStorage.chatDatabase);

var app = angular.module('myApp', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "./html/signUp.html"
    })
	.when("/chatPage/:mobileNo", {
		templateUrl : "./html/chatPage.html"
	});
});

// signUp controller 
app.controller('signUpCtrl', function($scope,$location) {
$scope.userName = "";
$scope.mobileNo = "";
$scope.myPassword = "";
$scope.conformMyPassword = "";
$scope.createUser = function(){
	var user ={};
		if($scope.myPassword == $scope.conformMyPassword ){
			user.userName = $scope.userName;
			user.mobileNo = $scope.mobileNo;
			user.password = $scope.myPassword;
			user.conversation=[];
			//user.FriendList=[];
			chatDatabase.users.push(user);	
			//$location.url('/SignUp_Success');	
			alert("Account created");
			$scope.userName = "";
			$scope.mobileNo = "";
			$scope.myPassword = "";
			$scope.conformMyPassword = "";
		}else{
			$scope.myPassword = "";
			$scope.conformMyPassword = "";
			alert("Passwords not matched");
		}
		localStorage.chatDatabase = JSON.stringify(chatDatabase);

	};
});

//login controller
app.controller('loginCtrl', function($scope,$location) {
	$scope.mobileNo = "";
	$scope.myPassword = "";
	$scope.users=chatDatabase.users;
	$scope.myLogin = function() {
		var flag =false;
		for(var i=0;i<$scope.users.length;i++){
			if($scope.mobileNo == $scope.users[i].mobileNo && $scope.myPassword == $scope.users[i].password ){
				flag = true;
			}
		}
			if(flag){
				sessionStorage.user1 = $scope.mobileNo;
				$location.url("/chatPage/"+$scope.mobileNo);
				
				
			}
			else{
				alert("Details not found");
			}
	};
});


//friendList controller

app.controller('friendCtrl',function($scope,$routeParams){
	$scope.friendsOrChat = false;
	$scope.chatlistBG = {"background-color": "#f2f2f2",
							"color" : "black"
						};
	
	$scope.friendslist = function(){
		$scope.friendsOrChat = true;
		$scope.friendlistBG = {"background-color": "#f2f2f2",
							"color" : "black"};
		$scope.chatlistBG= {"background-color": "#0cb757",
							"color" : "white"};
	
	}
	
	$scope.chatlist = function(){
		$scope.friendsOrChat = false;
		$scope.friendlistBG = {"background-color": "#0cb757",
							"color" : "white"};
		$scope.chatlistBG = {"background-color": "#f2f2f2",
							"color" : "black"};
	}
	
	
	$scope.friend = [];
	for(var i = 0;i<chatDatabase.users.length; i++){
		if(chatDatabase.users[i].mobileNo != $routeParams.mobileNo){
			$scope.friend.push({"name":chatDatabase.users[i].userName , "mobileNo" :chatDatabase.users[i].mobileNo });
		}
	}	
	console.log($scope.friend);
	for(var i = 0;i<chatDatabase.users.length; i ++){
		if(chatDatabase.users[i].mobileNo == $routeParams.mobileNo){
			$scope.chats = chatDatabase.users[i].conversation
		}
	}
	console.log($scope.chats);
	
	
	$scope.openTextBox = function(mobileNo){
		for(var i = 0;i<chatDatabase.users.length; i++){
			if(chatDatabase.users[i].mobileNo == mobileNo){
				flag = true;
				$scope.To = chatDatabase.users[i];
				
				//$scope.conversation = chatDatabase.users[i].conversation;
				//sessionStorage.To = JSON.stringify(chatDatabase.users[i]);
			}
		}
		var flag = false;
		for(var i = 0;i<chatDatabase.users.length; i++){
			if(chatDatabase.users[i].mobileNo == $routeParams.mobileNo){
				for(var j = 0; j<chatDatabase.users[i].conversation.length; j++ ){
					if(chatDatabase.users[i].conversation[j].mobileNo == mobileNo){
						$scope.Messages = chatDatabase.users[i].conversation[j].messages;
						flag = true;
					}
				}
			}
		}	
		if(flag){
		$scope.Display = true;
		}
		else{
			$scope.Display = false;
		}
	}
});



//conversation controller

app.controller('conversationCtrl',function($scope,$routeParams,messageFactoryMethod){
	$scope.message="";
	$scope.sendMessage=function(mobileNo){
			console.log(mobileNo);
			var ifMessageSent = messageFactoryMethod.sendMessageFactory($routeParams.mobileNo,mobileNo,$scope.message);
			if(ifMessageSent){
				alert("message sent");
			}
			else {
				alert("message not sent");
			}
		}
});

app.factory('messageFactoryMethod',function(){
	var factory = {};
	var chatDatabase = JSON.parse(localStorage.chatDatabase);

	factory.sendMessageFactory = function(From,To,message){
		var flagTo=false;
		var flagFrom=false;
		for(var i=0;i<chatDatabase.users.length;i++){
			if(To == chatDatabase.users[i].mobileNo){
				flagTo=true;
			}
			if(From == chatDatabase.users[i].mobileNo){
				flagFrom=true;
			}
		}
		console.log(flagTo+" "+flagFrom);
		if(flagTo && flagFrom){
			for(var i=0;i<chatDatabase.users.length;i++){
				if(To == chatDatabase.users[i].mobileNo){
					var flag = true;
					for(var j=0;j<chatDatabase.users[i].conversation.length;j++){
						if(chatDatabase.users[i].conversation[j].mobileNo == From){
							chatDatabase.users[i].conversation[j].messages.push({'Token':'receiver','message':message});
							flag=false;
						}
					}
					if(flag){
						newMessage ={};
						newMessage.mobileNo = From;
						newMessage.messages = [];
						newMessage.messages.push({'Token':'receiver','message':message});
						chatDatabase.users[i].conversation.push(newMessage);
					}
				}
				if(From == chatDatabase.users[i].mobileNo){
					var flag = true;
					for(var j=0;j<chatDatabase.users[i].conversation.length;j++){
						if(chatDatabase.users[i].conversation[j].mobileNo == To){
							console.log(chatDatabase.users[i]);
							chatDatabase.users[i].conversation[j].messages.push({'Token':'send','message':message});
							flag=false;
						}
					}
					if(flag){
						newMessage ={};
						newMessage.mobileNo = To;
						newMessage.messages = [];
						newMessage.messages.push({'Token':'send','message':message});
						chatDatabase.users[i].conversation.push(newMessage);
					}
				}
			}
			localStorage.chatDatabase = JSON.stringify(chatDatabase);
			return true;
		}
		else{
			return false;
		}
	}
	return factory;
});