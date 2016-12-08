(function(){

   'use strict'
    angular.module('myResume')
          .directive('initial',function(){
            console.log("hai");
              return{
                  restrict: 'E',
                  templateUrl:'Templates/Format1/Directives/initial.html'
              }
          })
          .directive('careerObj',function(){
              return{
                  restrict: 'E',
                  templateUrl:'Templates/Format1/Directives/careerobj.html'
              }
          })
          .directive('academics',function(){
              return{
                  restrict: 'E',
                  templateUrl:'Templates/Format1/Directives/academics.html'
              }
          })
          .directive('technicalskills',function(){
              return{
                  restrict: 'E',
                  templateUrl:'Templates/Format1/Directives/technicalskills.html'
              }
          })
          .directive('achievements',function(){
              return{
                  restrict: 'E',
                  templateUrl:'Templates/Format1/Directives/achievements.html'
              }
          })
          .directive('personaldetails',function(){
              return{
                  restrict: 'E',
                  templateUrl:'Templates/Format1/Directives/personaldetails.html'
              }
          })
})();
