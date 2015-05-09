'use strict';

/* Controllers */

var ListApp = angular.module('ListApp', []);

ListApp.controller('ListController', function($scope) {


  var itemName = [];

var list = JSON.parse(localStorage.getItem("item"));
$scope.lists= list;
  $scope.saveItem = function(){
  	var name= $scope.item.name;
    var list = JSON.parse(localStorage.getItem("item"));
  	console.log(list);
    if(list==null){
  	itemName.push(name);
  	localStorage.setItem("item", JSON.stringify(itemName));
    $scope.lists= itemName;
    }
    else{
       list.push(name);
       localStorage.setItem("item",JSON.stringify(list));
       $scope.lists= list;
    }
  }

  	$scope.remove = function(index){
  		 var list = JSON.parse(localStorage.getItem("item"));
  		 list.splice(index,1);
  		 localStorage.setItem("item",JSON.stringify(list));
  		 $scope.lists= list;

  	}

    $scope.editmode = false;

  	 $scope.toggleEditMode = function(){
    $scope.editmode = $scope.editmode === true ? false: true;
  }

  $scope.edit = function(value, index){
     var list = JSON.parse(localStorage.getItem("item"));
     list[index]=value;
       localStorage.setItem("item",JSON.stringify(list));
       $scope.lists= list;
       $scope.editmode= false;
  }

});


/** directive **/

ListApp.directive("contenteditable", function() {
  return {
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
});