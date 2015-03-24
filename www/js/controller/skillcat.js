var apps = angular.module('skillcatModule', ['ionic']);
    apps.controller('SkillCat',function($scope,$http, $state,$ionicPopup,$ionicModal, Settings, init, Auth, UniversalFunction, CrudOperation) {
       
          /*=============== employee(initial start of page will call this part) ============================= */
        
        /*-------------- initial value for page to show or hide button in employee form add/edit-------------*/
        var m = UniversalFunction.returnButtonOnly();
        $scope.btnAdd = m.add;
        $scope.btnEdit = m.edit;
        /*---------------------------*/

        /*------------initial value for form data of update function ----*/
        $scope.formData = UniversalFunction.returnDisplayFormData();
        /*---------------------------------------------------------------*/
        
         var url = Settings.url + '/dataAll/type/skills_categories/format/json';
              
        $http
          .get(url, Auth.doAuth(init.username, init.password))
          .success(function(data){
                //console.log(data);
              $scope.skcat = UniversalFunction.redraw(data.skills_categories);
                    
        }, function(err) {
              console.error('ERR', err);
              
        })
                    
        $scope.doRefresh = function(){
          $http
            .get(url, Auth.doAuth(init.username, init.password))
            .success(function(data){
                  
              $scope.skcat = UniversalFunction.redraw(data.skills_categories);
        }).finally(function(){
            $scope.$broadcast('scroll.refreshComplete');
          });
        };
               
         $ionicModal.fromTemplateUrl('category_Add.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.category_Add = modal
        });

        $ionicModal.fromTemplateUrl('category_Edit.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.category_Edit = modal
        });

          $scope.newCategory = function(){
            
              $scope.formData.category_name = "";
              $scope.category_Add.show();
          };

          $scope.editCategory = function(cat){
              var displayData = UniversalFunction.displayFormData(cat);
              $scope.formData = displayData;
              $scope.category_Edit.show();
          }

        /*================================ Add,edit,delete function ================================*/
        $scope.addData  = function(fd){

          $scope.formData = {};
          var params      = '/dataAll';                   // request Api link
          var data        = {                             // data sent to Api
                              type : "skills_categories", 
                              formData : fd
                        };
          //var stateToRedirect = 'app.skillcat';
          CrudOperation.add(params, data);
          $scope.category_Add.hide();
        } 

        $scope.editData = function(){

                    var params     = '/dataAll';                  // request Api link
                    var dataUpdate = {                             // field column need to update
                                        category_name         : $scope.formData.category_name,
                                        
                                    
                        };
                       // console.log(dataUpdate);
                    var data       = {                             // data sent to Api
                                      type : "skills_categories",
                                      primaryKey : 'category_id', 
                                      primaryKeyVal : $scope.formData.category_id,
                                      formData : dataUpdate
                        };
                    //var stateToRedirect = 'app.skillcat';           // State that will redirect after update process success
                    CrudOperation.update(params, data);
                    $scope.category_Edit.hide();  
                    console.log(data);
                } 

         $scope.deleteData = function(skc) {
                    var params = '/dataAll/type/skills_categories/key/category_id/val/'+skc.category_id;
                    CrudOperation.delete(params);
                }
        /*================================ End Add,edit,delete function ================================*/

        $scope.backHome = function(){
            UniversalFunction.home_button();
          }

})

