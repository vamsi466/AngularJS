var app = angular.module("myDetailsApp",[]);

app.controller('selfDetailsCtrl',function($scope){
  $scope.selfDetails = { 
        "Name": "M R S Vamsi Gupta",
        "DOB": "13-08-1994",
        "Born": "Visakhapatnam",
        "Hobbies":"Playing Cricket",
        "Interests":"Reading Books",
        "Profession":"UI Developer(Trainee)"
      };
   
});
