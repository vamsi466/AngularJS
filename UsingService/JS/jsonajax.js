(function(){

   'use strict'
    angular.module('jsonajaxcall',[])

    //afactory to consume webservices and return data to controllers.
    .factory('ajaxcallservice',['$http',function($http){
        return {
            getEmployees : function(JSONpath){
                return  $http.get(JSONpath).then(function(response){ //wrap it inside another promise using then
                            return response.data.employeedetails;  //only return employees
                        });
            }
        }
    }])
    //define controller and inject ajaxcall service as dependency.
    .controller('professionaldetailsController',['ajaxcallservice','$scope',function(ajaxcallservice,$scope){
        // $scope.httpPath="JSON/employeedetails.json"
        ajaxcallservice.getEmployees("JSON/employeedetails.json").then(function(response){
            $scope.employees = response; //Assign data received to $scope.employees
        });



        $scope.deletetheCard = function (index) {
            $scope.employees.splice(index, 1);
        }
    }])
    .controller('personaldetailsController',['ajaxcallservice','$scope',function(ajaxcallservice,$scope){
      // $scopehttpPath="JSON/personaldetails.json"
        ajaxcallservice.getEmployees("JSON/personaldetails.json").then(function(response){
            $scope.employees = response; //Assign data received to $scope.employees
        });
        $scope.deletetheCard = function (index) {
          console.log(index);
            $scope.employees.splice(index, 1);
        }

    }])

    .directive('ajaxCallDirective',function(){
        return{
            restrict: 'E',
            scope: {
              employee:'=',
              delete: '&'

            },
            templateUrl:'Templates/displayCards.html',
        }
    })

})();
