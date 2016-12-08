(function(){

   'use strict';
    angular.module('myResume')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when("/home", "/home/");
        $urlRouterProvider.when("/home/formats", "/home/formats/format1");
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('getstart', {
                url:'/',
                views:{
                "mainPart": {
                        templateUrl: 'Templates/getStart.html',

                        },
                      }
                  })
            .state('home', {
                url:'/home',
                views: {
                  "mainPart":{
                        templateUrl: '../Templates/navbar.html',
                        },
                      }
                  })
            .state('home.initial',{
                url:"/",
                views:{
                  "formatsPresent":{
                      templateUrl:"../Templates/home.html",
                    },
                  }
                })
            .state('home.verticalNav',{
                url:"/formats",
                views:{
                  "formatsPresent":{
                      templateUrl:"../Templates/verticalNavBar.html",
                    },
                  }
                })
            .state('home.verticalNav.default',{
                url:"/format1",
                views:{
                  'bodyPart':{
                      templateUrl:"../Templates/Format1/resume1.html",
                  },
                }
              })
          .state('home.verticalNav.format2',{
              url:"/format2",
              views:{
                'bodyPart':{
                    templateUrl:"../Templates/Format2/resume2.html",
                },
              }
            })
            .state('home.verticalNav.format3',{
                url:"/format3",
                views:{
                  'bodyPart':{
                      templateUrl:"../Templates/Format3/resume3.html",
                  },
                }
              })
      }])
})();
