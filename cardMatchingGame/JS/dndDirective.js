
(function(){

   'use strict'
    angular.module('cardMatchingGameApp')
    .directive('mydrag', function () {
      return {
        restrict: 'A',
        // scope:{
        //
        // }
        // var imagesPart1 = [];
        // var imagesPart2=[];
        link: function (scope, element, attrs) {
          element[0].addEventListener('dragstart', scope.handleDragStart, false);
          element[0].addEventListener('dragend', scope.handleDragEnd, false);
        },
        controller: function($scope){
          $scope.handleDragStart = function(e){
              this.style.opacity = '0.4';
              e.dataTransfer.setData('text/plain', this.innerHTML);
              if($('.leftSidePanel').children().length == 0){
                alert("You Won");
              }

          };

          $scope.handleDragEnd = function(e){
              this.style.opacity = '1.0';
          };
        }
      }
    })

    .directive('dro', function () {
      return {
        restrict: 'A',

        link: function (scope, element, attrs) {
          element.addClass("centerPanelImage");
          element[0].addEventListener('drop', scope.handleDrop, false);
          element[0].addEventListener('dragover', scope.handleDragOver, false);

        },
        controller: function($scope){
          $scope.isDragged = false;
          $scope.handleDrop = function(e){
                e.preventDefault();
                e.stopPropagation();

                var dataText = e.dataTransfer.getData('text/plain');

                var obj = $(dataText).find('.back');

                var imgName = $($(obj).children()[0]).attr('ng-src');
                if(($(dataText).hasClass('left') && $(this).hasClass('left')) || ($(dataText).hasClass('right') && $(this).hasClass('right'))){
                  $scope.$broadcast("imgNameSend",{imgN : imgName});
                  this.innerHTML = dataText;

                }
            };

            $scope.handleDragOver = function (e) {

                e.preventDefault(); // Necessary. Allows us to drop.
                //if(($(dataText).hasClass('left') && $(this).hasClass('left')) || ($(dataText).hasClass('right') && $(this).hasClass('right'))){
                e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

              // }else{
              //   e.dataTransfer.dropEffect = 'none';
              // }
              return false;
          };

        }
      }
    });
})();
