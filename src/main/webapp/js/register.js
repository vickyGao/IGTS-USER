var registerApp = angular.module('RegisterApp', ['ngCookies']);
 
registerApp.controller('RegisterController', function ($scope, $http, $cookieStore) {

     $scope.register = function () {
        if(!$scope.user.username || !$scope.surepassword || !$scope.user.password ){
             return; //The 3 fields cannot be empty
         }else if($scope.surepassword != $scope.user.password){
             $scope.warn_message = '两次密码输入不一致！';
         }else{
             var registerRequest = {
                     "user": $scope.user
                 };
              $http.post('user/api/user/entity', registerRequest).success(function (registerData) {
                  var loginRequest = {
                            "login":{
                                "username":registerData.user.username,
                                "password":$scope.user.password
                            }
                        };
                  $http.post("user/api/authorization/login", loginRequest).success(function (data) {
                      $cookieStore.put('x-auth-token', data.sessioncontext.token);
                      $cookieStore.put('sessioncontext', data.sessioncontext);
                      window.location.href = 'index.html';
                      return;
                  });
             })
             .error(function(message) {
                 $scope.warn_message = message;
             });
         }
     };

     $scope.tologin = function () {
         window.location.href = 'login.html';
     };

     $scope.toIndex = function () {
         window.location.href = 'index.html';
     };

 });