var apps = angular.module('skillModule', ['ionic']);
    apps.controller('Skill',function($scope,$http, $state,$ionicPopup,$ionicModal, Settings, init, Auth, UniversalFunction, CrudOperation) {
       
          /*=============== employee(initial start of page will call this part) ============================= */
        
        /*-------------- initial value for page to show or hide button in employee form add/edit-------------*/
        var m = UniversalFunction.returnButtonOnly();
        $scope.btnAdd = m.add;
        $scope.btnEdit = m.edit;
        /*---------------------------*/

        /*------------initial value for form data of update function ----*/
        $scope.formData = UniversalFunction.returnDisplayFormData();
        /*---------------------------------------------------------------*/
        
        var url = Settings.url + '/dataAll/type/skills/format/json';
              
        $http
          .get(url, Auth.doAuth(init.username, init.password))
          .success(function(data){
                
              $scope.skills = UniversalFunction.redraw(data.skills);
                    
        }, function(err) {
              console.error('ERR', err);
              
        })
                    
        $scope.doRefresh = function(){
          $http
            .get(url, Auth.doAuth(init.username, init.password))
            .success(function(data){
                  
              $scope.skills = UniversalFunction.redraw(data.skills);

        }).finally(function(){
            $scope.$broadcast('scroll.refreshComplete');
          });
        };
               

        $scope.goToAddDataPage = function(){

          $state.go('app.skillAdd_Edit',{},{reload:false});
          /*------------- If click add new button show only submit button with save function--------------*/
          var m = UniversalFunction.buttonOnly(true,false);
          $scope.btnAdd = m.add;
          $scope.btnEdit = m.edit;
          /*---------------------------*/
          /*---- set form value to blank */
          UniversalFunction.displayFormData('');                   
                  
        }

        $scope.goToEditDataPage = function(sks){

                    $state.go('app.skillAdd_Edit',{},{reload:false});
                    /*-------------If click edit button show only save button with edit function--------------*/
                    var n           = UniversalFunction.buttonOnly(false,true);
                    $scope.btnAdd   = n.add;
                    $scope.btnEdit  = n.edit;
                    /*---------------------------*/
                    /*-- display value form list into update form */
                    var b           = UniversalFunction.displayFormData(sks);
                    $scope.formData = b;
                    
              }


        $scope.skill_category = function(){

          $state.go('app.skillcat',{},{reload:true});

          /*var m = UniversalFunction.buttonOnly(true,false);
          $scope.btnAdd = m.add;
          $scope.btnEdit = m.edit;
          
          UniversalFunction.displayFormData('');                   
          
*/
        }


       var params = '/dataAll/type/skills_categories/key/is_active/val/1/format/json';
                  CrudOperation.get(params).success(function(data){  $scope.skill_cat = data.skills_categories;  });
        
        
        /*================================ Add function ================================*/
        $scope.addData  = function(){

          var sk = [];
              sk.push(this.formData);
          var params      = '/dataAll';                   // request Api link
          var data        = {                             // data sent to Api
                              type : "skills", 
                              formData : sk
                        };
          var stateToRedirect = 'app.skills';
          CrudOperation.add(params, data, stateToRedirect);
          
        } 

        $scope.editData = function(){

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

         $scope.deleteData = function(skill) {
                    var params = '/dataAll/type/skills/key/skill_id/val/'+skill.skill_id;
                    CrudOperation.delete(params);
                }
        /*================================ End Add function ================================*/

        $scope.backHome = function(){
            UniversalFunction.home_button();
          }

})

