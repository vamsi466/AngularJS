(function(){

   'use strict'
    angular.module('novoCloud')
          .directive('logo',function(){
              return{
                  restrict: 'E',
                  templateUrl:'Templates/logoBar.html'
              }
          })
          .directive('collapse',function(){
              return{
                  restrict: 'E',
                  templateUrl:'Templates/collapseButton.html'
              }
          })
          .directive('itemsnavbar',function(){
              return{
                  restrict: 'E',
                  templateUrl:'Templates/itemsNavBar.html'
              }
          })
          .directive('revenueinfo',function(){
              return{
                  restrict: 'E',
                  templateUrl:'Templates/revenueinfo.html'
              }
          })
          .directive('tableandgraph',function(){
              return{
                  restrict: 'E',
                  templateUrl:'Templates/tableandgraph.html'
              }
          })
          .directive('revenuetable',function(){
              return{
                  restrict: 'E',
                  templateUrl:'Templates/revenueTable.html'
              }
          })
})();
