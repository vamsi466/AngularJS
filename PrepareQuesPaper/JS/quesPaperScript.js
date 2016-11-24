var app = angular.module("myApp", ["ngRoute","ngDialog"]);

app.config(function($routeProvider) {
    $routeProvider
	//routing towards home page
    .when("/", {
        templateUrl : "./templates/Home.html"
    })
	//routing to preparingQuestionPaper
	.when("/EnterSections", {
        templateUrl : "./templates/enterSections.html"
    })
	.when("/EnterQuestions/:sec_name", {
        templateUrl : "./templates/enterQuestions.html"
    })
	.when("/viewTotalPaper", {
		templateUrl : "./templates/ViewTotalQuestionPaper.html"
	});
});


app.controller('createQuesPaperCtrl',function($scope,$location){
//app.controller('createQuesPaperCtrl',function($scope,ngDialog){

	$scope.createQuesPaper = function(){
		localStorage.QuestionPaper = '{"sections" : []}';
		localStorage.AnsPaper = '{"sections" : []}';
		//ngDialog.open({template:"./templates/enterSections.html"});
		$location.url("/EnterSections");
	}

});

app.controller('sectionEntryCtrl',function($scope,$location,$interval){
//app.controller('sectionEntryCtrl',function($scope,ngDialog){
	var QuestionPaper = JSON.parse(localStorage.QuestionPaper);
	
	$scope.sectionNameList=QuestionPaper.sections;
	$scope.detailsofpapaer=false;
	$scope.totalMarks="";
	$scope.duration="";
	$interval(function(){
		
		$scope.sectionNameList=QuestionPaper.sections;
		
	},500);
	var AnsPaper = JSON.parse(localStorage.AnsPaper);
	
	$scope.creatingSection = function(){
		$scope.addsection=true;
		
	};

	$scope.createSec = function(){
		var sectionName = $scope.sectionName;
		var flagIs = true;
		
			for(var i = 0; i< QuestionPaper.sections.length; i++){
				if(QuestionPaper.sections[i].Name == sectionName){
					flagIs = false;
					break;
				}
			}
			
		if(sectionName!=undefined){ 
			if(flagIs){
				var section = {};
				section.Name = sectionName; 
				section.Questions = [];
				QuestionPaper.sections.push(section);
				
				var sectionAns = {};
				sectionAns.Name = sectionName; 
				sectionAns.Questions = {};
				AnsPaper.sections.push(sectionAns);
				
				localStorage.AnsPaper = JSON.stringify(AnsPaper);
				localStorage.QuestionPaper = JSON.stringify(QuestionPaper);
				alert(sectionName + " section created perfectly")
				$scope.sectionName = "";
			}
		}else{
			alert("Please enter a valid Section Name")
		}
		
	};
	
	$scope.removeSec = function() {
		QuestionPaper = JSON.parse(localStorage.QuestionPaper);
		var toRemoveItem = $scope.sectionName;
		for(var i = 0; i< QuestionPaper.sections.length; i++){					
			if(QuestionPaper.sections[i].Name == toRemoveItem ){		
				QuestionPaper.sections.splice(i,1);
			}
		}			
		localStorage.QuestionPaper = JSON.stringify(QuestionPaper);
		$scope.sectionName = "";
	 };

	$scope.viewpaper= function(){
		$scope.detailsofpaper=true;
	}; 
	
	$scope.opencompletepaper = function(){
		if($scope.totalMarks == undefined || $scope.duration ==undefined){
			alert("Please Enter Test Details")
		}
		else{
			var QuestionPaper = {};
			QuestionPaper.TotalMarks = $scope.totalMarks;
			QuestionPaper.Duration = $scope.duration;
			QuestionPaper.sections = (JSON.parse(localStorage.QuestionPaper)).sections;
			
			
			localStorage.QuestionPaper = angular.toJson(QuestionPaper);
			
			$location.url("/viewTotalPaper");
		}
	}
			
});

app.controller('questionEntryCtrl', function($scope,$location,$routeParams){
//app.controller('questionEntryCtrl', function($scope,ngDialog,$routeParams){
	var QuestionPaper = JSON.parse(localStorage.QuestionPaper);
	var AnsPaper = JSON.parse(localStorage.AnsPaper);
	var sectionName = $routeParams.sec_name;
	$scope.addquestion = true;
	
	$scope.addQuestion = function(){
		$scope.question = true;
		
		
	};
	
	$scope.options = [];
	$scope.addOption = function(){
		var flag = true;
		for(var i=0; i<($scope.options).length; i++){
			if($scope.options[i] == $scope.option){
				flag = false;
				alert("This Option already given.")
			}
		}
		if(flag){
			($scope.options).push($scope.option);
			$scope.option = "";
		}
	};
	
	$scope.countOfWords = function(text) {
		var inputText = text ? text.split(/\s+/) : 0; // it splits the text even if we have space/tab/enter
		return inputText ? inputText.length : '';
	};
	
	/*$scope.lastWord = function(){
		var str = ;
	}; */
	
	$scope.remove = function(option) { 
	for(var i=0;i<($scope.options).length ;i++){
		  if($scope.options[i]===option){
			  var index = $scope.options.indexOf(option);
			  $scope.options.splice(index, 1);  
		  }	  
		}
	};
	
	
	$scope.saveQuestion = function(){
		
				if($scope.ques != undefined){
					if($scope.countOfWords($scope.ques)<10 ){				
					
						if(($scope.options).length >= 2){
							var ans = ($scope.answer != undefined)? parseInt($scope.answer) : 0 ;
							if((ans > 0)&&(ans <=($scope.options).length)){
								for(var i = 0; i<QuestionPaper.sections.length; i++){
									if(QuestionPaper.sections[i].Name == sectionName){
										var id = ((i+1)*100)+((QuestionPaper.sections[i].Questions.length)+1);
										var question = {};
										question.ID = id;
										question.Question = $scope.ques;
										question.Options = $scope.options;
										
										
										QuestionPaper.sections[i].Questions.push(question);
										localStorage.QuestionPaper = angular.toJson(QuestionPaper); 
										alert("Question add Successfully");
										$scope.ques = "";
										$scope.options = [];
										
										
										if(AnsPaper.sections[i].Name == sectionName){
											AnsPaper.sections[i].Questions[id] = ans;
											localStorage.AnsPaper = angular.toJson(AnsPaper); 
											$scope.answer = "";
										}
										$scope.addquestion = false;
										$scope.question = true;
										$scope.ques="";
										$scope.option="";
										$scope.answer = "";
										break;
									}
								}
							}else{
								alert("Please enter valid Answer");
								}				
						}else{
							alert("Enter Minimum 2 options");
						}
				}else{
					alert("You exceeded word limit or ? is missing")
				}
			}else{
				alert("Please enter a question");
			}
		};
	
		$scope.saveQuestions = function(){
			if($scope.ques==undefined||$scope.options==undefined||$scope.answer ==undefined){
				alert("Please enter all the Aspects");
			}else{
				$location.url("/EnterSections");
		        //ngDialog.open({template:"./templates/enterSections.html"})
			}
	
	};
});
	app.controller('viewQuesPaperCtrl',function($scope,$routeParams,$location){

	var QuestionPaper = JSON.parse(localStorage.QuestionPaper);
	var section = $routeParams.section;
	$scope.questionPaper = QuestionPaper;
	for(var i=0; i<QuestionPaper.sections.length; i++){
		if(QuestionPaper.sections[i].Name == section){
			$scope.section = QuestionPaper.sections[i];
		}
	
	}
	
	// function route the page to create question paper view.
	$scope.back = function(){	
		$location.url("/EnterSections");
	}
	
	// function route the page to home 
	$scope.home = function(){	
		$location.url("/");
	}
	
	// function to download the json file.
	$scope.download = function(){	
		var data = localStorage.QuestionPaper;
		var filename = "QuestionPaper.json";
		var blob = new Blob([data], {type: 'text/json'});
        var e    = document.createEvent('MouseEvents');
        var a    = document.createElement('a');

        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':');
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
	}
	

});



