var apps = angular.module('trackingModule', ['ionic']);
    apps.controller('Tracking',function($scope,$http, $state,$ionicPopup,$ionicModal, Settings, init, Auth, UniversalFunction, CrudOperation) {
       
          /*=============== employee(initial start of page will call this part) ============================= */
        
        /*-------------- initial value for page to show or hide button in employee form add/edit-------------*/
        var m = UniversalFunction.returnButtonOnly();
        $scope.btnAdd = m.add;
        $scope.btnEdit = m.edit;
        /*---------------------------*/

        /*------------initial value for form data of update function ----*/
        $scope.formData = UniversalFunction.returnDisplayFormData();
        /*---------------------------------------------------------------*/
        
        var url = Settings.url + '/dataAll/type/timeoff/joinid/employee_id/jointo/employees/format/json';
              
       $http
          .get(url, Auth.doAuth(init.username, init.password))
          .success(function(data){
                
              $scope.trackings = UniversalFunction.redraw(data.timeoff);
                    
        }, function(err) {
              console.error('ERR', err);
              
        })
                    
        $scope.doRefresh = function(){
          $http
            .get(url, Auth.doAuth(init.username, init.password))
            .success(function(data){
                  
              $scope.trackings = UniversalFunction.redraw(data.timeoff);

        }).finally(function(){
            $scope.$broadcast('scroll.refreshComplete');
          });
        };
               

        $scope.goToEditPage = function(tracking_id){

           CrudOperation.get('/dataAll/type/timeoff/key/record_id/val/'+tracking_id+'/format/json').success(function(data){ 
                
                $scope.formData = data.timeoff[0];
                $scope.record_id = data.timeoff[0].record_id;
                $scope.s_button = false;
                $scope.e_button = true;
                $scope.modal_tracking.show();
                
          });                
          
        }

        /*================================ Edit function ================================*/
                $scope.editData = function(tracking_id){

                    var params     = '/dataAll';                  // request Api link
                    var dataUpdate = {                             // field column need to update
                                        employee_id : $scope.formData.employee_id,
                                        start_time : $scope.formData.start_time,
                                        end_time : $scope.formData.end_time,
                                        type : $scope.formData.type,
                                        status : $scope.formData.status,
                                        employee_comment : $scope.formData.employee_comment,
                                        comment : $scope.formData.comment
                         };
                    var data       = {                             // data sent to Api
                                      type : "timeoff",
                                      primaryKey : 'record_id', 
                                      primaryKeyVal : tracking_id,
                                      formData : dataUpdate
                        };
                    $scope.modal_tracking.hide();
                    var stateToRedirect = 'app.tracking';           // State that will redirect after update process success
                    CrudOperation.update(params, data, stateToRedirect, true);  
                } 
        /*================================ End Edit function ================================*/
  
        $scope.goToAddData = function(){
                $scope.s_button = true;
                $scope.e_button = false;
                $scope.formData = "";
                $scope.record_id = "";                
                $scope.modal_tracking.show();
        }

        $scope.deleteData = function(record_id){

                var params = '/dataAll/type/timeoff/key/record_id/val/'+record_id;
                CrudOperation.delete(params);
             
        }


        CrudOperation.get('/dataAll/type/employees/format/json').success(function(data){ 
                $scope.employees = data.employees;
              
        });
        

        $scope.status = {
          isFirstOpen: true,
          isFirstDisabled: false
        };

        
        /*---------------------- modal box -------------------------------*/
        
        $ionicModal.fromTemplateUrl('modal_tracking.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.modal_tracking = modal
        });

        
        /*---------------------- end modal box -------------------------------*/
         
         /*------------------ education --------------------*/
        var dataEdu = [{institution : '',
                  description : '',
                  start : '',
                  end : ''}];
            dataEdu.splice(0,1);
        $scope.edu_data = [];
        $scope.add_education = function(edu){
              
              dataEdu.push({
                  institution : edu.institution,
                  description : edu.description,
                  start : edu.start,
                  end : edu.end
                });
              
              $scope.edu_data = dataEdu;
             
        }
        /*-------------- end education -----------------------*/

        

         
        
        
        /*================================ Add function ================================*/
        $scope.addData  = function(){

          var h = [];
              h.push(this.formData);
       
          var params      = '/dataAll';                  
          var data        = {                            
                              type : "timeoff", 
                              formData : h
                        };
          var stateToRedirect = 'app.tracking';
          $scope.modal_tracking.hide();
          CrudOperation.add(params, data);
          //$state.go('app.employees',{},{reload:true});  
        } 
        
})

