var apps = angular.module('positionModule', ['ionic','ui.bootstrap']);
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

         var params = '/dataAll/type/departments/key/is_active/val/1/format/json';
                  CrudOperation.get(params).success(function(data){  $scope.dpt = data.departments;  });

          if ($state.is('app.positionAdd_Edit')) {
            var params = '/dataAll/type/positions/format/json';
                  CrudOperation.get(params).success(function(data){  $scope.pp = data.positions;  });
          };

             var params = '/dataAll/type/positions_skills/format/json';
                  CrudOperation.get(params).success(function(data){  $scope.poskill = data.positions_skills;  });

            var params = '/dataAll/type/skills/format/json';
                  CrudOperation.get(params).success(function(data){  $scope.skk = data.skills;  });

           $ionicModal.fromTemplateUrl('pos_skill.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true,
            backdropClickToClose : false    
        }).then(function(modal) {
            $scope.pos_skill = modal
        });
         $scope.checkmodel= {};
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
              //var stateToRedirect = 'app.position';
              CrudOperation.add_no_redirect(params, data);
              console.log("add");
              $scope.pos_skill.show();
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
                  //console.log(pt);
              var params      = '/dataAll';                   // request Api link
              var data        = {                             // data sent to Api
                                  type : "positions", 
                                  formData : pt
                            };
              //var stateToRedirect = 'app.position';
              CrudOperation.add_no_redirect(params, data);
              console.log("add");
              $scope.pos_skill.show();
              
          }
        }

        $scope.addrequired  = function(cm){
            // console.log(cm); 

            CrudOperation.get('/dataOrderBy/type/positions/order_id/position_id/order_val/desc').success(function(data){
                var pid =  data.positions.position_id;
                console.log(pid);
            
            var cc = [];
            angular.forEach(cm, function(value, key) {
                this.push(value);
            }, cc);

            console.log(cc); 
            for (var i = 0; i < cc.length; i++) {

                if(cc[i] !== 0){
                    var a = "";
                    a = cc[i].toString();
                    //console.log(a);

                        var test = {
                            position_id : pid,
                            skill_id : a
                        }
                        //console.log(test);

                        var ps = [];
                        ps.push(test);
                        //console.log(ps);
                        var params      = '/dataAll';                   // request Api link
                        var data        = {                             // data sent to Api
                                  type : "positions_skills", 
                                  formData : ps
                        };

                        var stateToRedirect = 'app.position';
                        
                        CrudOperation.add(params, data, stateToRedirect);
                        $scope.pos_skill.hide()
                }

            };        
          })
        }; 

       
        $scope.editData = function(c){
            console.log($scope.formData.position_id);
            /*var z = 0;     
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
                    var data       = {                             // data sent to Api
                        type : "positions",
                        primaryKey : 'position_id', 
                        primaryKeyVal : $scope.formData.position_id,
                        formData : pt
                    };
                    //var stateToRedirect = 'app.position';
                    CrudOperation.update_no_redirect(params, data);
                    console.log("edit");

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
                //console.log(pt);
                var params      = '/dataAll';                   // request Api link
                var data       = {                             // data sent to Api
                    type : "positions",
                    primaryKey : 'position_id', 
                    primaryKeyVal : $scope.formData.position_id,
                    formData : pt
                };
                //var stateToRedirect = 'app.position';
                CrudOperation.update_no_redirect(params, data);
                console.log("edit");

                }*/
                    
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
                    //var stateToRedirect = 'app.position';           // State that will redirect after update process success
                    CrudOperation.update_no_redirect(params, data);  
                    $scope.pos_skill.show();
                   
                    
        } 

        $scope.editrequired  = function(cm){
            var pid = $scope.formData.position_id;
            var end = 0;
            var cc = [];
            angular.forEach(cm, function(value, key) {
                this.push(value);
            }, cc);

            console.log(cc); 

            for (var i = 0; i < cc.length; i++) {
                var counter = 0;
                for (var a = 0; a < $scope.poskill.length; a++) {
                    if ($scope.poskill[a].position_id == $scope.formData.position_id && cc[i] == $scope.poskill[a].skill_id) {
                        counter++;
                        console.log(counter);
                    };
                };
                if(counter == 0){
                    var dataSkill = "";
                    dataSkill = cc[i].toString();
                    //console.log(a);

                        var test = {
                            position_id : pid,
                            skill_id : dataSkill
                        }
                        console.log(test);

                        var ps = [];
                        ps.push(test);
                        //console.log(ps);
                        var params      = '/dataAll';                   // request Api link
                        var data        = {                             // data sent to Api
                                  type : "positions_skills", 
                                  formData : ps
                        };
                        var stateToRedirect = 'app.position';
                        $scope.pos_skill.hide()
                        CrudOperation.add(params, data, stateToRedirect);
                    console.log("add skill to positions_skills")
                }

            };
             
        }

         $scope.deleteData = function(p) {
                    var params = '/dataAll/type/positions/key/position_id/val/'+p.position_id;
                    CrudOperation.delete(params);
                }
        /*================================ End Add function ================================*/

        $scope.backHome = function(){
            UniversalFunction.home_button();
          }

         $scope.exitAdd = function(){
          $scope.pos_skill.hide()
           $state.go('app.position');

        }
         $scope.exitEdit = function(){
          
           $state.go('app.position');
           $scope.formData = "";
        }
       


})

