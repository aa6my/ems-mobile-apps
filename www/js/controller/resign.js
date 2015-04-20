var apps = angular.module('resignModule', ['ionic']);
    apps.controller('Resign',function($scope,$http, $state,$ionicPopup,$ionicModal, Settings, init, Auth, UniversalFunction, CrudOperation) {
       
          /*=============== employee(initial start of page will call this part) ============================= */
        
        /*-------------- initial value for page to show or hide button in employee form add/edit-------------*/
        var m = UniversalFunction.returnButtonOnly();
        $scope.btnAdd = m.add;
        $scope.btnEdit = m.edit;
        /*---------------------------*/

        /*------------initial value for form data of update function ----*/
        $scope.formData = UniversalFunction.returnDisplayFormData();
        /*---------------------------------------------------------------*/
        
         var url = Settings.url + '/dataAll/type/resign_reasons/key/is_active/val/1/format/json';
              
        $http
          .get(url, Auth.doAuth(init.username, init.password))
          .success(function(data){
                //console.log(data);
              $scope.resign = UniversalFunction.redraw(data.resign_reasons);
                    
        }, function(err) {
              console.error('ERR', err);
              
        })
                    
        $scope.doRefresh = function(){
          $http
            .get(url, Auth.doAuth(init.username, init.password))
            .success(function(data){
                  
              $scope.resign = UniversalFunction.redraw(data.resign_reasons);
        }).finally(function(){
            $scope.$broadcast('scroll.refreshComplete');
          });
        };

          $ionicModal.fromTemplateUrl('add_resign.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.add_resign = modal
        });
        $ionicModal.fromTemplateUrl('edit_resign.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.edit_resign = modal
        });

        $scope.addReasons = function(){
          $scope.formData.reason_name = "";
          $scope.add_resign.show();
        }
        $scope.editReasons = function(r){
        var displayData = UniversalFunction.displayFormData(r);
          $scope.formData = displayData;
          $scope.edit_resign.show();
        }



        /*================================ Add,edit,delete function ================================*/
        $scope.addData  = function(fd){
          
          var resAdd = [];
              resAdd.push(fd);
          var params      = '/dataAll';                   // request Api link
          var data        = {                             // data sent to Api
                              type : "resign_reasons", 
                              formData : resAdd
                        };
          //var stateToRedirect = 'app.skillcat';
          CrudOperation.add(params, data);
          $scope.add_resign.hide();
          
        } 

        $scope.editData = function(){

                    var params     = '/dataAll';                  // request Api link
                    var dataUpdate = {                             // field column need to update
                                        reason_name         : $scope.formData.reason_name,
                                        
                                    
                        };
                       // console.log(dataUpdate);
                    var data       = {                             // data sent to Api
                                      type : "resign_reasons",
                                      primaryKey : 'reason_id', 
                                      primaryKeyVal : $scope.formData.reason_id,
                                      formData : dataUpdate
                        };
                    //var stateToRedirect = 'app.skillcat';           // State that will redirect after update process success
                    CrudOperation.update(params, data);
                    $scope.edit_resign.hide();  
                } 

         $scope.deleteData = function(rr) {
                    var params = '/dataAll/type/resign_reasons/key/reason_id/val/'+rr.reason_id;
                    CrudOperation.delete(params);
                }
        /*================================ End Add,edit,delete function ================================*/

        $scope.backHome = function(){
            UniversalFunction.home_button();
          }

})

