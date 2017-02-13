(function(){

   'use strict'
    angular.module('cardMatchingGameApp')
    .controller('leftSidePanelCtrl',['shufflecards','ajaxcallservice','$scope',function(shufflecards,ajaxcallservice,$scope){
        ajaxcallservice.getCards('JSON/imagesArray.json').then(function(response){
              $scope.cards = shufflecards.shuffle(response);
        });


    }])
    .controller('rightSidePanelCtrl',['shufflecards','ajaxcallservice','$scope',function(shufflecards,ajaxcallservice,$scope){
        ajaxcallservice.getCards('JSON/imagesArray.json').then(function(response){
              $scope.cardsInPanel = shufflecards.shuffle(response);
        });
    }])
    .controller('resultBoxCtrl',['$scope','$timeout',function($scope,$timeout){
        var resultArr = [];
        $scope.$on('imgNameSend',function(e, obj){
          resultArr.push(obj.imgN);
          $timeout(function(){

            if(resultArr.length == 2){
              if(resultArr[0] == resultArr[1]){
                var id1 = $($('.centerPanelImage .flip-container')[0]).attr('id');
                var id2 = $($('.centerPanelImage .flip-container')[1]).attr('id');
                var cardsMatched = 0;
                    $('.centerPanelImage .flipper').addClass('flipped');

                    $timeout(function () {

                      $('.centerPanelImage')[0].innerHTML = "";
                      $('.centerPanelImage')[1].innerHTML = "";
                      alert("Cards Matched");
                      cardsMatched ++;
                      $scope.CardsMatched = cardsMatched;
                      // $('#'+id1)[0].outerHTML = "";
                      // $('#'+id2)[0].outerHTML = "";
                      $($($('#'+id1)[0]).parent()[0])[0].outerHTML = "";
                      $($($('#'+id2)[0]).parent()[0])[0].outerHTML = "";
                      if($('.leftSidePanel').children().length == 0 && $('.rightSidePanel').children().length == 0){
                        $('#youwongame').modal('show');
                        // alert("yOu WoN GamE")
                      }

                    }, 1500);

 
              }else{
               $('.centerPanelImage .flipper').addClass('flipped');
                $timeout(function () {
                   $('.centerPanelImage')[0].innerHTML = "";
                   $('.centerPanelImage')[1].innerHTML = "";
                 }, 1500);
              }
              resultArr = [];
            }
          },300);


        })
    }]);
})();
