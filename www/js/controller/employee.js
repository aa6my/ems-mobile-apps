var apps = angular.module('employeeModule', ['ionic']);
    apps.controller('Employee',function($scope,$http, $state,$ionicPopup,$ionicModal, Settings, init, Auth, UniversalFunction, CrudOperation) {
       
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

        

        $scope.status = {
          isFirstOpen: true,
          isFirstDisabled: false
        };

        
        $ionicModal.fromTemplateUrl('modal_education.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.modal_education = modal
        });

         
         //var k = [{}];         
             //a = 0;
        $scope.edu_data = [];
        $scope.add_education = function(edu){
              //edu.id = a;
              //a++;
              //console.log(k);
              $scope.edu_data.push(edu);
              console.log($scope.edu_data);
              console.log(edu);

              //$scope.edu_data = k;
             
             
        }

         
        
        
        /*================================ Add function ================================*/
        $scope.addData  = function(){

        
          var params      = '/dataAll';                   // request Api link
          var data        = {                             // data sent to Api
                              type : "employees", 
                              formData : this.formData
                        };
          var stateToRedirect = 'app.employees';
          CrudOperation.add_no_redirect(params, data).success(function(){
            CrudOperation.get('/dataOrderBy/type/employees/order_id/employee_id/order_val/desc').success(function(data){
              var employee_id =  data.employees.employee_id;

                  //angular.forEach(k, function(value, key) {
                    //console.log(k);
                  //});
              //console.log(data.employees.employee_id);
              
            })
          })
        } 
        /*================================ End Add function ================================*/

})

