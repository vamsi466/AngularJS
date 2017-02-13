(function(){

   'use strict'
    angular.module('eventListenerApp',[])

    //define controller and inject ajaxcall service as dependency.
    .controller('eventListenerCtrl',['$scope',function($scope){
    
        $scope.Boxes = [1,2,3,4,5,6,7,8,9]

        var selectedBoxIndex =  Math.floor(Math.random() * $scope.Boxes.length);
        $scope.selectedBox = parseInt(selectedBoxIndex);
        console.log($scope.selectedBox)

          $scope.navigatorFunction = function(index){
                $scope.selectedBox = index;
                console.log($scope.selectedBox)
         }
        
    }])



    .directive('navigator',['$document',function($document){
    return{
        restrict:'A',
       
        link:function(scope,elem,attrs,ctrl){
            var elemFocus = false;         
                console.log(scope.selectedBox)
            elem.on('mouseenter',function(){
                elemFocus = true;
               
            });
            elem.on('mouseleave',function(){
                elemFocus = false;
                
            });
            $document.bind('keydown',function(e){
                if(elemFocus){
                    console.log(scope.selectedBox)
                    if(e.keyCode == 37){
                        $('.history').append("---Left");
                        if(scope.selectedBox == 0|| scope.selectedBox == 3 ||scope.selectedBox == 6){
                            return;
                        }else{
                        scope.selectedBox--;
                        }scope.$apply();
                        e.preventDefault();

                    }
                    if(e.keyCode == 38){
                        $('.history').append("---Up");
                        if(scope.selectedBox == 0|| scope.selectedBox == 1 ||scope.selectedBox == 2){
                            return;
                        }else{
                        scope.selectedBox-=3;
                        }scope.$apply();
                        e.preventDefault();
                    }
                    if(e.keyCode == 39){
                         $('.history').append("---Right");
                        if(scope.selectedBox == 2|| scope.selectedBox == 5 ||scope.selectedBox == 8){
                            return;
                        }else{
                        scope.selectedBox++;
                        }scope.$apply();
                        e.preventDefault();
                    }
                    if(e.keyCode == 40){
                         $('.history').append("---Down");
                         if(scope.selectedBox == 6|| scope.selectedBox == 7||scope.selectedBox == 8){
                            return;
                        }else{
                        scope.selectedBox+=3;
                        }scope.$apply();
                        e.preventDefault();
                    }
                }
            });
        }
    };
}]);



})();
