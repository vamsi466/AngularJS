(function(){

   'use strict'
    angular.module('cardMatchingGameApp')
    .factory('ajaxcallservice',['$http',function($http){
        return {
            getCards : function(JSONpath){
                return  $http.get(JSONpath).then(function(response){ //wrap it inside another promise using then

                            return response.data.cards;  //only return employees
                        });
            }
        }
    }])
    .service('shufflecards', function() {
        this.shuffle = function (array) {
          var arrayCopy = angular.copy(array);
          var len = arrayCopy.length;
          var newArray = [];
          while(len > 0){
            var i = Math.floor(Math.random() * len);
            newArray.push(arrayCopy[i]);
            arrayCopy.splice(i,1);
            len--;
          }
          return newArray;
        }
    });
})();
