var apps = angular.module('performanceModule', ['ionic']);
    apps.controller('Performance',function($scope,$http, $state,$ionicPopup,$ionicModal, Settings, init, Auth, UniversalFunction, CrudOperation) {
       

          /*=============== employee(initial start of page will call this part) ============================= */
        
        /*-------------- initial value for page to show or hide button in employee form add/edit-------------*/
        var m = UniversalFunction.returnButtonOnly();
        $scope.btnAdd = m.add;
        $scope.btnEdit = m.edit;
        /*---------------------------*/

        /*------------initial value for form data of update function ----*/
        $scope.formData = UniversalFunction.returnDisplayFormData();
        /*---------------------------------------------------------------*/
        
        var url = Settings.url + '/dataAll/type/performance_criteria/format/json';
              
        $http
          .get(url, Auth.doAuth(init.username, init.password))
          .success(function(data){
                
              $scope.performance_criterias = UniversalFunction.redraw(data.performance_criteria);
                    
        }, function(err) {
              console.error('ERR', err);
              
        })
                    
        $scope.doRefresh = function(){
          $http
            .get(url, Auth.doAuth(init.username, init.password))
            .success(function(data){
                  
              $scope.performance_criterias = UniversalFunction.redraw(data.performance_criteria);

        }).finally(function(){
            $scope.$broadcast('scroll.refreshComplete');
          });
        };

        $scope.doRefreshAppraisal = function(){
          $http
            .get(Settings.url + '/dataAll/type/performance_appraisal/joinid/employee_id/jointo/employees/format/json', Auth.doAuth(init.username, init.password))
            .success(function(data){
                  
              $scope.performance_appraisals = UniversalFunction.redraw(data.performance_appraisal);

        }).finally(function(){
            $scope.$broadcast('scroll.refreshComplete');
          });
               
        }
            
        $scope.goToCriteria = function(){
          $state.go('app.criteria',{},{reload:true});
        }   

        $scope.goToAppraisal = function(){
          $state.go('app.appraisal',{},{reload:true});
        } 

        $scope.goToAddDataPage = function(){
                $scope.s_button = true;
                $scope.e_button = false;
                $scope.formData = "";
                $scope.criterion_id = "";                
                $scope.modal_criteria.show();
        }

        /*================================ Add function ================================*/
        $scope.addData  = function(){

          var h = [];
              h.push(this.formData);
       
          var params      = '/dataAll';                  
          var data        = {                            
                              type : "performance_criteria", 
                              formData : h
                        };
          var stateToRedirect = 'app.criteria';
          $scope.modal_criteria.hide();
          CrudOperation.add(params, data);
          //$state.go('app.employees',{},{reload:true});  
        } 


        $scope.goToEditPage = function(criterion_id){

           CrudOperation.get('/dataAll/type/performance_criteria/key/criterion_id/val/'+criterion_id+'/format/json').success(function(data){ 
                
                $scope.formData = data.performance_criteria[0];
                //console.log(data.performance_criteria[0]);
                $scope.criterion_id = data.performance_criteria[0].criterion_id;
                $scope.s_button = false;
                $scope.e_button = true;
                $scope.modal_criteria.show();
                
          });                
          
        }

         $scope.editData = function(criterion_id){

          var params     = '/dataAll';                  // request Api link
          var dataUpdate = {                             // field column need to update
                              criterion_name : $scope.formData.criterion_name
                          };
          var data       = {                             // data sent to Api
                              type : "performance_criteria",
                              primaryKey : 'criterion_id', 
                              primaryKeyVal : criterion_id,
                              formData : dataUpdate
                          };
          $scope.modal_criteria.hide();
          var stateToRedirect = 'app.criteria';           // State that will redirect after update process success
          CrudOperation.update(params, data, stateToRedirect, true);  
          
          } 

        $scope.deleteData = function(criterion_id){

                var params = '/dataAll/type/performance_criteria/key/criterion_id/val/'+criterion_id;
                CrudOperation.delete(params);
             
        }  
        
        
        /*---------------------- modal box -------------------------------*/
        $ionicModal.fromTemplateUrl('modal_criteria.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.modal_criteria = modal
        });

        
        
        

     /*===================================================== appraisal =======================================*/   
        
        var url = Settings.url + '/dataAll/type/performance_appraisal/joinid/employee_id/jointo/employees/format/json';
              
        $http
          .get(url, Auth.doAuth(init.username, init.password))
          .success(function(data){
                
              $scope.performance_appraisals = UniversalFunction.redraw(data.performance_appraisal);
                    
        }, function(err) {
              console.error('ERR', err);
              
        })

        CrudOperation.get('/dataAll/type/employees/format/json').success(function(data){ 
                $scope.employees = data.employees;
              
        });

        $ionicModal.fromTemplateUrl('modal_appraisal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.modal_appraisal = modal
        });
       
       $scope.goToAddDataPageAppraisal = function(){
          $scope.s_button = true;
          $scope.e_button = false;
          $scope.formData = "";
          $scope.appraisal_id = "";                
          $scope.modal_appraisal.show();
       }

       $scope.addDataAppraisal = function(){
          var h = [];
              h.push(this.formData);
       
          var params      = '/dataAll';                  
          var data        = {                            
                              type : "performance_appraisal", 
                              formData : h
                        };
          var stateToRedirect = 'app.appraisal';
          $scope.modal_appraisal.hide();
          CrudOperation.add(params, data);     
       }

       $scope.goToEditPageAppraisal = function(appraisal_id){
          CrudOperation.get('/dataAll/type/performance_appraisal/key/appraisal_id/val/'+appraisal_id+'/format/json').success(function(data){ 
                
                $scope.formData = data.performance_appraisal[0];
                //console.log(data.performance_criteria[0]);
                $scope.appraisal_id = data.performance_appraisal[0].appraisal_id;
                $scope.s_button = false;
                $scope.e_button = true;
                $scope.modal_appraisal.show();
                
          });        
        }

        $scope.editDataAppraisal = function(appraisal_id){
          var params     = '/dataAll';                  // request Api link
          var dataUpdate = {                             // field column need to update
                              employee_id   : $scope.formData.employee_id,
                              start_date    : $scope.formData.start_date,
                              end_date      : $scope.formData.end_date,
                              expectations  : $scope.formData.expectations
                          };
          var data       = {                             // data sent to Api
                              type : "performance_appraisal",
                              primaryKey : 'appraisal_id', 
                              primaryKeyVal : appraisal_id,
                              formData : dataUpdate
                          };
          $scope.modal_appraisal.hide();
          var stateToRedirect = 'app.appraisal';           // State that will redirect after update process success
          CrudOperation.update(params, data, stateToRedirect, true);          
        }
        
        
        
        

})


