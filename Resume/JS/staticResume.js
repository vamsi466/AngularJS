(function(){

   'use strict'
    angular.module('myResume',[])

    //afactory to consume webservices and return data to controllers.
    .factory('ajaxcallservice',['$http',function($http){
        return {
            getEmployees : function(JSONpath){
                return  $http.get(JSONpath).then(function(response){ //wrap it inside another promise using then
                            return response.data.resumedetails;  //only return employees
                        });
            }
        }
    }])
    //define controller and inject ajaxcall service as dependency.
    .controller('resumeDisplay',['ajaxcallservice','$scope',function(ajaxcallservice,$scope){
        // $scope.httpPath="JSON/employeedetails.json"
        ajaxcallservice.getEmployees("JSON/resume.json").then(function(response){
          console.log(response)
            $scope.details = response; //Assign data received to $scope.employees

        });
    }])


    .directive('careerObj',function(){
        return{
            restrict: 'E',
            templateUrl:'Templates/careerobj.html'
        }
    })
    .directive('academics',function(){
        return{
            restrict: 'E',
            templateUrl:'Templates/academics.html'
        }
    })
    .directive('technicalskills',function(){
        return{
            restrict: 'E',
            templateUrl:'Templates/technicalskills.html'
        }
    })
    .directive('achievements',function(){
        return{
            restrict: 'E',
            templateUrl:'Templates/achievements.html'
        }
    })
    .directive('personaldetails',function(){
        return{
            restrict: 'E',
            templateUrl:'Templates/personaldetails.html'
        }
    })

})();
