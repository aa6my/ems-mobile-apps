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
          //UniversalFunction.displayFormData("");                   
            $scope.formData.position_name  = ""; 
            $scope.formData.responsibilities  = "";
            $scope.formData.department_id  = ""; 
            $scope.formData.position_name  = "";  

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
                    console.log($scope.formData);
              }

         var params = '/dataAll/type/departments/format/json';
                  CrudOperation.get(params).success(function(data){  $scope.dpt = data.departments;  });

          if ($state.is('app.positionAdd_Edit')) {
            var params = '/dataAll/type/positions/format/json';
                  CrudOperation.get(params).success(function(data){  $scope.pp = data.positions;  });
            
          };
           
           
        /*================================ Add function ================================*/
        $scope.addData  = function(c){
          var z = 0;     
          if (c == "1") {
            for (var i = 0; i < $scope.pp.length; i++) {
                if(this.formData.department_id == $scope.pp[i].department_id && c == $scope.pp[i].is_head){
                  z++;
                  console.log(z);
                }
            }
            if (z == 0){
              var a = {
                  position_name         : this.formData.position_name,
                  responsibilities    : this.formData.responsibilities,
                  department_id :  this.formData.department_id,
                  is_head : c
              };
              var pt = [];
                  pt.push(a);
                  console.log(pt);
              var params      = '/dataAll';                   // request Api link
              var data        = {                             // data sent to Api
                                  type : "positions", 
                                  formData : pt
                            };
              var stateToRedirect = 'app.position';
              CrudOperation.add(params, data, stateToRedirect);
              console.log("add");
            } else if(z !== 0){
               alert("Sorry, Head of Department is busy.");
              // $state.go('app.position',{},{reload:true});
            }
          }

          if (c == "0"){
            var a = {
                  position_name         : this.formData.position_name,
                  responsibilities    : this.formData.responsibilities,
                  department_id :  this.formData.department_id,
                  is_head : c
              };
              var pt = [];
                  pt.push(a);
                  console.log(pt);
              var params      = '/dataAll';                   // request Api link
              var data        = {                             // data sent to Api
                                  type : "positions", 
                                  formData : pt
                            };
              var stateToRedirect = 'app.position';
              CrudOperation.add(params, data, stateToRedirect);
              console.log("add");
          }
        }
       
        $scope.editData = function(){

                    var params     = '/dataAll';                  // request Api link
                    var dataUpdate = {                             // field column need to update
                                        position_name         : $scope.formData.position_name,
                                        responsibilities    : $scope.formData.responsibilities,
                                        department_id :  $scope.formData.department_id
                              
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

