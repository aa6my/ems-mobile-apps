var apps = angular.module('companyModule', ['ionic']);
    apps.controller('Company',function($scope,$http, $state,$ionicPopup,$ionicModal, Settings, init, Auth, UniversalFunction, CrudOperation) {

    
        /*------------initial value for form data of update function ----*/
        $scope.formData = UniversalFunction.returnDisplayFormData();
        /*---------------------------------------------------------------*/
        
        var url = Settings.url + '/dataAll/type/settings/key/setting_group/val/company/format/json';
              
        $http
          .get(url, Auth.doAuth(init.username, init.password))
          .success(function(data){
                
              $scope.company =data.settings;
                   
        }, function(err) {
              console.error('ERR', err);
              
        })
          $scope.doRefresh = function(){
          $http
            .get(url, Auth.doAuth(init.username, init.password))
            .success(function(data){
                  
              $scope.company = data.settings;

        }).finally(function(){
            $scope.$broadcast('scroll.refreshComplete');
          });
        };

        $scope.details  = [ "Company Name",
                            "Company Phone",
                            "Company Email",
                            "Address",
                            "City",
                            "Zip",
                            "State"
                          ];

        $scope.goToEditDataPage = function(){

            $state.go('app.companyAdd_Edit',{},{reload:false});
           
            for (var i = 0; i < $scope.company.length; i++) {
              if (i == 0) {
                $scope.formData.company_name = $scope.company[i].setting_value;
              };
              if (i == 1 ) {
                $scope.formData.company_phone = $scope.company[i].setting_value;
              };
              if (i == 2) {
                $scope.formData.company_email = $scope.company[i].setting_value;
              };
              if (i == 3) {
                $scope.formData.company_address = $scope.company[i].setting_value;
              };
              if (i == 4) {
                $scope.formData.company_city = $scope.company[i].setting_value;
              };
              if (i == 5) {
                $scope.formData.company_zip = $scope.company[i].setting_value;
              };
              if (i == 6) {
                $scope.formData.company_state = $scope.company[i].setting_value;
              };
              console.log($scope.company[i]);
            };
        }

       
        $scope.backHome = function(){
            UniversalFunction.home_button();
          }


    })
       
         