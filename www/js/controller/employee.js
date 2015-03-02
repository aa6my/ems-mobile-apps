var apps = angular.module('employeeModule', ['ionic']);
    apps.controller('Employee',function($scope,$http, $state,$ionicPopup, Settings, init, Auth, UniversalFunction, CrudOperation) {
       
          /*=============== employee(initial start of page will call this part) ============================= */
        
        /*-------------- initial value for page to show or hide button in employee form add/edit-------------*/
        var m = UniversalFunction.returnButtonOnly();
        $scope.btnAdd = m.add;
        $scope.btnEdit = m.edit;
        /*---------------------------*/

        /*------------initial value for form data of update function ----*/
        $scope.formData = UniversalFunction.returnDisplayFormData();
        /*---------------------------------------------------------------*/
        
         var url = Settings.url + '/dataAll/type/employees/format/json';
            console.log(url);     
              $http
                .get(url, Auth.doAuth(init.username, init.password))
                .success(function(data){
                 
                    $scope.employees = UniversalFunction.redraw(data.employees);
                    
              }, function(err) {
                  console.error('ERR', err);
              
              })
                    
            $scope.doRefresh = function(){
              $http
                .get(url, Auth.doAuth(init.username, init.password))
                .success(function(data){
                  
                    $scope.employees = UniversalFunction.redraw(data.employees);

              })
              .finally(function(){
                $scope.$broadcast('scroll.refreshComplete');
              });
            };
               
              

      })

