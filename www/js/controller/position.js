var apps = angular.module('positionModule', ['ionic']);
    apps.controller('Position',function($scope,$http, $state,$ionicPopup,$ionicModal, Settings, init, Auth, UniversalFunction, CrudOperation) {
       
          /*=============== employee(initial start of page will call this part) ============================= */
        
        /*-------------- initial value for page to show or hide button in employee form add/edit-------------*/
        var m = UniversalFunction.returnButtonOnly();
        $scope.btnAdd = m.add;
        $scope.btnEdit = m.edit;
        /*---------------------------*/

        /*------------initial value for form data of update function ----*/
        $scope.formData = UniversalFunction.returnDisplayFormData();
        /*---------------------------------------------------------------*/
        
        var url = Settings.url + '/dataAll/type/positions/format/json';
              
        $http
          .get(url, Auth.doAuth(init.username, init.password))
          .success(function(data){
                
              $scope.posts = UniversalFunction.redraw(data.positions);
                    
        }, function(err) {
              console.error('ERR', err);
              
        })
                    
        $scope.doRefresh = function(){
          $http
            .get(url, Auth.doAuth(init.username, init.password))
            .success(function(data){
                  
              $scope.posts = UniversalFunction.redraw(data.positions);

        }).finally(function(){
            $scope.$broadcast('scroll.refreshComplete');
          });
        };
               

        $scope.goToAddDataPage = function(){

          $state.go('app.positionAdd_Edit',{},{reload:false});
          /*------------- If click add new button show only submit button with save function--------------*/
          var m = UniversalFunction.buttonOnly(true,false);
          $scope.btnAdd = m.add;
          $scope.btnEdit = m.edit;
          /*---------------------------*/
          /*---- set form value to blank */
          UniversalFunction.displayFormData('');                   
                  
        }

        $scope.goToEditDataPage = function(pos){

                    $state.go('app.positionAdd_Edit',{},{reload:false});
                    /*-------------If click edit button show only save button with edit function--------------*/
                    var n           = UniversalFunction.buttonOnly(false,true);
                    $scope.btnAdd   = n.add;
                    $scope.btnEdit  = n.edit;
                    /*---------------------------*/
                    /*-- display value form list into update form */
                    var b           = UniversalFunction.displayFormData(pos);
                    $scope.formData = b;
                    
              }

         var params = '/dataAll/type/departments/format/json';
                  CrudOperation.get(params).success(function(data){  $scope.dpt = data.departments;  });

        
        
        /*================================ Add function ================================*/
        $scope.addData  = function(){

          var pt = [];
              pt.push(this.formData);
              console.log(pt);
          if(pt.is_head = true){
            console.log("a");
          }
          var params      = '/dataAll';                   // request Api link
          var data        = {                             // data sent to Api
                              type : "positions", 
                              formData : pt
                        };
          var stateToRedirect = 'app.position';
          CrudOperation.add(params, data, stateToRedirect);
          
        } 

        $scope.editData = function(){

                    var params     = '/dataAll';                  // request Api link
                    var dataUpdate = {                             // field column need to update
                                        position_name         : $scope.formData.position_name,
                                        responsibilities    : $scope.formData.responsibilities
                              
                        };
                    var data       = {                             // data sent to Api
                                      type : "positions",
                                      primaryKey : 'position_id', 
                                      primaryKeyVal : $scope.formData.position_id,
                                      formData : dataUpdate
                        };
                    var stateToRedirect = 'app.position';           // State that will redirect after update process success
                    CrudOperation.update(params, data, stateToRedirect);  
                } 

         $scope.deleteData = function(p) {
                    var params = '/dataAll/type/positions/key/position_id/val/'+p.position_id;
                    CrudOperation.delete(params);
                }
        /*================================ End Add function ================================*/

        $scope.backHome = function(){
            UniversalFunction.home_button();
          }

})

