var apps = angular.module('settingModule', ['ionic']);
    apps.controller('Setting',function($scope,$http, $state) {

      $scope.goComp = function(){
        $state.go('app.company');
      }
    })
       
         