var apps = angular.module('employeeModule', ['ionic']);
    apps.controller('Employee',function($scope,$http, $state,$ionicPopup,$ionicModal, Settings, init, Auth, UniversalFunction, CrudOperation, tempService) {
       
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

        
        /*---------------------- modal box -------------------------------*/
        $ionicModal.fromTemplateUrl('modal_education.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.modal_education = modal
        });

        $ionicModal.fromTemplateUrl('modal_employement.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.modal_employement = modal
        });

        $ionicModal.fromTemplateUrl('modal_license.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.modal_license = modal
        });

        $ionicModal.fromTemplateUrl('modal_family.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.modal_family = modal
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

        /*------------------ employeement --------------------*/
        var dataEmp = [{
                  company           : '',
                  position          : '',
                  start             : '',
                  end               : '',
                  responsibilities  : ''
                }];
            dataEmp.splice(0,1);
        $scope.emp_data = [];
        $scope.add_employement = function(emp){
              
              dataEmp.push({
                  company           : emp.company,
                  position          : emp.position,
                  start             : emp.start,
                  end               : emp.end,
                  responsibilities  : emp.responsibilities
                });
              
              $scope.emp_data = dataEmp;
             
        }
        /*-------------- end employeement -----------------------*/

        /*------------------ license --------------------*/
        var dataLic = [{
                  license_name    : '',
                  license_number  : '',
                  license_expiry  : ''
                }];
            dataLic.splice(0,1);
        $scope.lic_data = [];
        $scope.add_license = function(lic){
              
              dataLic.push({
                  license_name    : lic.license_name,
                  license_number  : lic.license_number,
                  license_expiry  : lic.license_expiry
                });
              
              $scope.lic_data = dataLic;
             
        }
        /*-------------- end License -----------------------*/

        /*------------------ family --------------------*/
        var dataFam = [{
                  relative_name     : '',
                  relative_type     : '',
                  birht_date        : ''
                }];
            dataFam.splice(0,1);
        $scope.fam_data = [];
        $scope.add_family = function(fam){
              
              dataFam.push({
                  relative_name     : fam.relative_name,
                  relative_type     : fam.relative_type,
                  birht_date        : fam.birht_date
                });
              
              $scope.fam_data = dataFam;
             
        }
        /*-------------- end family -----------------------*/

         
        
        
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
              
                // Populate edu data
                angular.forEach(dataEdu,function(value, key){
                  dataEdu[key].employee_id = employee_id;
                });

                var data        = {                            
                                    type : "employees_education", 
                                    formData : dataEdu
                                  };
                CrudOperation.add_no_redirect(params, data).success(function(){ // insert into education

                    // Populate emp data
                    angular.forEach(dataEmp,function(value, key){
                         dataEmp[key].employee_id = employee_id;
                    });

                    var data        = {                            
                                        type : "employees_employment", 
                                        formData : dataEmp
                                      };
                    CrudOperation.add_no_redirect(params, data).success(function(){ // insert into employement
                         
                        // Populate lic data
                        angular.forEach(dataLic,function(value, key){
                             dataLic[key].employee_id = employee_id;
                        });

                        var data        = {                            
                                            type : "employees_licenses", 
                                            formData : dataLic
                                          };
                         CrudOperation.add_no_redirect(params, data).success(function(){ // insert into license

                              // Populate fam data
                              angular.forEach(dataFam,function(value, key){
                                   dataFam[key].employee_id = employee_id;
                              });

                              var data        = {                            
                                                  type : "employees_family", 
                                                  formData : dataFam
                                                };
                              CrudOperation.add_no_redirect(params, data).success(function(){ // insert into family


                              });
                         });
                    });                  
                });   
            });
          })
        } 
        /*================================ End Add function ================================*/

})
.factory('tempService', function(){
  var func     = {};
  var formData = [];

  func.addData = function(edu){

    formData.push(edu);
  }

  func.returnData = function(){
    return formData;
  }

  return func;
})

