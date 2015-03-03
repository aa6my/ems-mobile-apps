var apps_login = angular.module('loginModule', []);
	
  apps_login.controller('titleCtrl', ['$scope','Settings', function($scope,Settings){
    $scope.company_name = Settings.company_name;
  }]);

	apps_login.controller('Login',['$scope','$http', '$ionicSideMenuDelegate','$stateParams', 'Settings', '$state', 'init', 'Auth','$ionicPopup',function($scope,$http, $ionicSideMenuDelegate,$stateParams, Settings, $state, init, Auth,$ionicPopup) {
  $ionicSideMenuDelegate.canDragContent(false);
  
  
    //url = 'http://' +Settings.domain_name+ '/x/x/dataAll/type/employees/format/json';
    //url = 'http://192.168.0.202/x/x/dataAll/type/employees/format/json';
    url = 'http://localhost/ems/x/x/dataAll/type/employees/format/json';

    /** Using dummy data for development testing only */
    $scope.username = 'admin@admin.com';
    $scope.password = '!@#$';
    /* remove this in production environment */
   
  $scope.doLogin = function(){

      var user = {
        username : $scope.username,
        password : $scope.password
      } 

  $http.get(url, Auth.doAuth(user.username, user.password))
        .success(function(data) {
        
        $ionicSideMenuDelegate.canDragContent(true);

          var alertPopup = $ionicPopup.alert({
              title: 'Login Successful',
              template: 'Going to dashboard!'
          })  
             
          init.username   = user.username;
          init.password   = user.password;
          //Settings.url    = 'http://'+Settings.domain_name+'/x/x';
          //Settings.url    = 'http://192.168.0.202/x/x';
          Settings.url    = 'http://localhost/ems/x/x';
          $state.go('app.dashboard');
          console.log(Settings.url);
        })
        .error(function(data, status, headers, config){
       
            $scope.alerts = [
              { type: 'danger', msg: 'Oh snap! Wrong Username/Password.' },
            ]

            $scope.closeAlert = function(index) {
              $scope.alerts.splice(index, 1);
            }

        })             
  }
  
}]);
