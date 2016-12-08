(function(){

   'use strict'
    angular.module('myResume',['ui.router'])

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



})();
