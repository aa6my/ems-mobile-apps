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
                  
              $scope.performance_criteria = UniversalFunction.redraw(data.performance_criteria);

        }).finally(function(){
            $scope.$broadcast('scroll.refreshComplete');
          });
        };
               

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

        $scope.goToCriteria = function(){
          $state.go('app.criteria',{},{reload:true});
        }
        
        

        
        

         
        
        
        
        

})


