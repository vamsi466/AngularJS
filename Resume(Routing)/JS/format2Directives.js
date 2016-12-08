(function(){

   'use strict'
    angular.module('myResume')
          .directive('initialformat2',function(){
            console.log("hai");
              return{
                  restrict: 'E',
                  templateUrl:'Templates/Format2/Directives/initial.html'
              }
          })
          .directive('careerObjformat2',function(){
              return{
                  restrict: 'E',
                  templateUrl:'Templates/Format2/Directives/careerobj.html'
              }
          })
          .directive('academicsformat2',function(){
              return{
                  restrict: 'E',
                  templateUrl:'Templates/Format2/Directives/academics.html'
              }
          })
          .directive('technicalskillsformat2',function(){
              return{
                  restrict: 'E',
                  templateUrl:'Templates/Format2/Directives/technicalskills.html'
              }
          })
          .directive('achievementsformat2',function(){
              return{
                  restrict: 'E',
                  templateUrl:'Templates/Format2/Directives/achievements.html'
              }
          })
          .directive('personaldetailsformat2',function(){
              return{
                  restrict: 'E',
                  templateUrl:'Templates/Format2/Directives/personaldetails.html'
              }
          })
})();
