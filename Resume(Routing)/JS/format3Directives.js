(function(){

   'use strict'
    angular.module('myResume')
          .directive('initialformat3',function(){
            console.log("hai");
              return{
                  restrict: 'E',
                  templateUrl:'Templates/Format3/Directives/initial.html'
              }
          })
          .directive('careerObjformat3',function(){
              return{
                  restrict: 'E',
                  templateUrl:'Templates/Format3/Directives/careerobj.html'
              }
          })
          .directive('academicsformat3',function(){
              return{
                  restrict: 'E',
                  templateUrl:'Templates/Format3/Directives/academics.html'
              }
          })
          .directive('technicalskillsformat3',function(){
              return{
                  restrict: 'E',
                  templateUrl:'Templates/Format3/Directives/technicalskills.html'
              }
          })
          .directive('achievementsformat3',function(){
              return{
                  restrict: 'E',
                  templateUrl:'Templates/Format3/Directives/achievements.html'
              }
          })
          .directive('personaldetailsformat3',function(){
              return{
                  restrict: 'E',
                  templateUrl:'Templates/Format3/Directives/personaldetails.html'
              }
          })
})();
