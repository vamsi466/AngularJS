(function(){

   'use strict'
    angular.module('jsonajaxcall',[])

    //afactory to consume webservices and return data to controllers.
    .factory('ajaxcallservice',['$http',function($http){
        return {
            getEmployees : function(){
                return  $http.get('JSON/employeedetails.json').then(function(response){ //wrap it inside another promise using then
                            console.log(response.data);
                            return response.data;  //only return employees
                        });
            }
        }
    }])
    //define controller and inject ajaxcall service as dependency.
    .controller('jsontoajaxController',['ajaxcallservice','$scope',function(ajaxcallservice,$scope){
        ajaxcallservice.getEmployees().then(function(response){
            $scope.employees = response; //Assign data received to $scope.employees
        });
    }])

    .directive('ajaxCallDirective',function(){
        return{
            restrict: 'E',
            templateUrl:'Templates/displayCards.html'
        }
    })

})();
