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
        
        var url = Settings.url + '/dataAll/type/employees/format/json';
              
        $http
          .get(url, Auth.doAuth(init.username, init.password))
          .success(function(data){
                
              $scope.employees = UniversalFunction.redraw(data.employees);
                    
        }, function(err) {
              console.error('ERR', err);
              
        })
                    
        $scope.doRefresh = function(){
          $http
            .get(url, Auth.doAuth(init.username, init.password))
            .success(function(data){
                  
              $scope.employees = UniversalFunction.redraw(data.employees);

        }).finally(function(){
            $scope.$broadcast('scroll.refreshComplete');
          });
        };
               

        $scope.goToAddDataPage = function(){

          $state.go('app.employeeAdd_Edit',{},{reload:false});
          /*------------- If click add new button show only submit button with save function--------------*/
          var m = UniversalFunction.buttonOnly(true,false);
          $scope.btnAdd = m.add;
          $scope.btnEdit = m.edit;
          /*---------------------------*/
          /*---- set form value to blank */
          UniversalFunction.displayFormData('');                   
                  
        }

        
        
        /*---------------------- modal box -------------------------------*/
        $ionicModal.fromTemplateUrl('modal_education.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.modal_education = modal
        });

        $scope.goToCriteria = function(){
          $state.go('app.criteria',{},{reload:true});
        }
        
        

        
        

         
        
        
        
        

})


