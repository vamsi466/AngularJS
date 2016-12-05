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



        // $scope.deletetheCard = function (index) {
        //     $scope.employees.splice(index, 1);
        // }
    }])
    // .controller('personaldetailsController',['ajaxcallservice','$scope',function(ajaxcallservice,$scope){
    //   // $scopehttpPath="JSON/personaldetails.json"
    //     ajaxcallservice.getEmployees("JSON/personaldetails.json").then(function(response){
    //         $scope.employees = response; //Assign data received to $scope.employees
    //     });
    //     $scope.deletetheCard = function (index) {
    //       console.log(index);
    //         $scope.employees.splice(index, 1);
    //     }
    //
    // }])

    // .directive('ajaxCallDirective',function(){
    //     return{
    //         restrict: 'E',
    //         scope: {
    //           employee:'=',
    //           delete: '&'
    //
    //         },
    //         templateUrl:'Templates/displayCards.html',
    //     }
    // })

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
