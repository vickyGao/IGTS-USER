var registerApp = angular.module('RegisterApp', ['ngCookies']);
 
registerApp.controller('RegisterController', function ($scope, $http, $cookieStore) {

     $scope.register = function () {
        if(!$scope.user || $scope.surepassword == null || $scope.user.password == null){
            $scope.warn_message = '请完善注册信息！';
          }else if($scope.surepassword != $scope.user.password){
             $scope.warn_message = '两次密码输入不一致！';
         }else{
             var request = {
                     "user": $scope.user
                 };
             UserService.create(request, $scope.newpass.oldPass).success(function (data) {
                 $cookieStore.put('x-auth-token', data.sessioncontext.token);
                 $cookieStore.put('sessioncontext', data.sessioncontext);
                 window.location.href = 'index.html';
                 return;
             });
         }
     };

     $scope.tologin = function () {
         window.location.href = 'login.html';
     };

 });