var apps = angular.module('settingModule', ['ionic']);
    apps.controller('Setting',function($scope,$http, $state,$ionicPopup,$ionicModal, Settings, init, Auth, UniversalFunction, CrudOperation) {

        $scope.goComp = function(){
          $state.go('app.company');
        }
        $scope.goDept = function(){
               $state.go('app.department');
        }
        $scope.goResign = function(){
               $state.go('app.resign');
        }
    
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

         $scope.editCompany = function(){

                    var params     = '/dataAll';                  // request Api link
                    var dataUpdate = {                             // field column need to update
                                        skill_name         : $scope.formData.skill_name,
                                        skill_requirements    : $scope.formData.skill_requirements,
                                        parent_category     : $scope.formData.parent_category
                                        

                        };
                    var data       = {                             // data sent to Api
                                      type : "skills",
                                      primaryKey : 'skill_id', 
                                      primaryKeyVal : $scope.formData.skill_id,
                                      formData : dataUpdate
                        };
                    var stateToRedirect = 'app.skills';           // State that will redirect after update process success
                    CrudOperation.update(params, data, stateToRedirect);  
                } 
      

    })
       
         