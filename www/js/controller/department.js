var apps = angular.module('departmentModule', ['ionic']);
    apps.controller('Dept',function($scope,$http, $state,$ionicPopup,$ionicModal, Settings, init, Auth, UniversalFunction, CrudOperation) {
       
          /*=============== employee(initial start of page will call this part) ============================= */
        
        /*-------------- initial value for page to show or hide button in employee form add/edit-------------*/
        var m = UniversalFunction.returnButtonOnly();
        $scope.btnAdd = m.add;
        $scope.btnEdit = m.edit;
        /*---------------------------*/

        /*------------initial value for form data of update function ----*/
        $scope.formData = UniversalFunction.returnDisplayFormData();
        /*---------------------------------------------------------------*/
        
         var url = Settings.url + '/dataAll/type/departments/format/json';
              
        $http
          .get(url, Auth.doAuth(init.username, init.password))
          .success(function(data){
                //console.log(data);
              $scope.setDept = UniversalFunction.redraw(data.departments);
                    
        }, function(err) {
              console.error('ERR', err);
              
        })
                    
        $scope.doRefresh = function(){
          $http
            .get(url, Auth.doAuth(init.username, init.password))
            .success(function(data){
                  
              $scope.setDept = UniversalFunction.redraw(data.departments);
        }).finally(function(){
            $scope.$broadcast('scroll.refreshComplete');
          });
        };

          $ionicModal.fromTemplateUrl('dept_modal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.dept_modal = modal
        });
        $ionicModal.fromTemplateUrl('dept_edit.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.dept_edit = modal
        });

        $scope.addept = function(){
          $scope.formData.department_name = "";
          $scope.dept_modal.show();
        }
        $scope.editDept = function(dpt){
        var displayData = UniversalFunction.displayFormData(dpt);
          $scope.formData = displayData;
          $scope.dept_edit.show();
        }



        /*================================ Add,edit,delete function ================================*/
        $scope.addData  = function(fd){
          
          var deptAdd = [];
              deptAdd.push(fd);
          var params      = '/dataAll';                   // request Api link
          var data        = {                             // data sent to Api
                              type : "departments", 
                              formData : deptAdd
                        };
          //var stateToRedirect = 'app.skillcat';
          CrudOperation.add(params, data);
          $scope.dept_modal.hide();
          
        } 

        $scope.editData = function(){

                    var params     = '/dataAll';                  // request Api link
                    var dataUpdate = {                             // field column need to update
                                        department_name         : $scope.formData.department_name,
                                        
                                    
                        };
                       // console.log(dataUpdate);
                    var data       = {                             // data sent to Api
                                      type : "departments",
                                      primaryKey : 'department_id', 
                                      primaryKeyVal : $scope.formData.department_id,
                                      formData : dataUpdate
                        };
                    //var stateToRedirect = 'app.skillcat';           // State that will redirect after update process success
                    CrudOperation.update(params, data);
                    $scope.dept_edit.hide();  
                } 

         $scope.deleteData = function(d) {
                    var params = '/dataAll/type/departments/key/department_id/val/'+d.department_id;
                    CrudOperation.delete(params);
                }
        /*================================ End Add,edit,delete function ================================*/

        $scope.backHome = function(){
            UniversalFunction.home_button();
          }

})

