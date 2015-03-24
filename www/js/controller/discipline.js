var apps = angular.module('disciplineModule', ['ionic']);
    apps.controller('Discipline',function($scope,$http, $state,$ionicPopup,$ionicModal, Settings, init, Auth, UniversalFunction, CrudOperation, tempService) {
       
          /*=============== employee(initial start of page will call this part) ============================= */
        
        /*-------------- initial value for page to show or hide button in employee form add/edit-------------*/
        var m = UniversalFunction.returnButtonOnly();
        $scope.btnAdd = m.add;
        $scope.btnEdit = m.edit;
        /*---------------------------*/

        /*------------initial value for form data of update function ----*/
        $scope.formData = UniversalFunction.returnDisplayFormData();
        /*---------------------------------------------------------------*/
        
        var url = Settings.url + '/dataAll/type/discipline/joinid/employee_id/jointo/employees/format/json';
              
        $http
          .get(url, Auth.doAuth(init.username, init.password))
          .success(function(data){
                
              $scope.disciplines = UniversalFunction.redraw(data.discipline);
                    
        }, function(err) {
              console.error('ERR', err);
              
        })
                    
        $scope.doRefresh = function(){
          $http
            .get(url, Auth.doAuth(init.username, init.password))
            .success(function(data){
                  
              $scope.disciplines = UniversalFunction.redraw(data.discipline);

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

        CrudOperation.get('/dataAll/type/employees/format/json').success(function(data){ 
              $scope.employees = data.employees;
              
        });
        

        $scope.status = {
          isFirstOpen: true,
          isFirstDisabled: false
        };

        
        /*---------------------- modal box -------------------------------*/
        $ionicModal.fromTemplateUrl('modal_discipline.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.modal_discipline = modal
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
                              type : "employees", 
                              formData : h
                        };
          
          CrudOperation.add_no_redirect(params, data).success(function(){   // insert into employee
            CrudOperation.get('/dataOrderBy/type/employees/order_id/employee_id/order_val/desc').success(function(data){ // get employee id
             var employee_id =  data.employees.employee_id;
                
            });
          })
        } 
        
})

