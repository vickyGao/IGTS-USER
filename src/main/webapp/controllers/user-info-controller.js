rootApp.controller('OwnerInfoManagementController', function ($scope, $routeParams, $cookieStore, $window, UserService ) {
    $scope.show = false;
    $scope.user = {
            'id' : $routeParams.userId
    };

    $scope.$on('event:showUserInfo', function (event, userId) {
        UserService.getDetail(userId).success(function (data) {
            $scope.user = data.user;
        });
    });

    $scope.showUpdateass = function(){
        $scope.show = true;
    }

    $scope.sureUpdatePass = function(){
        if($scope.newpass.newPass != $scope.newpass.surePass){
            showDialog("Warning", "新密码和确认密码不一致！");
        }else{
            $scope.user.password = $scope.newpass.surePass;
            var request = {
                    "user": $scope.user
                };
            UserService.updatePass(request, $scope.newpass.oldPass).success(function (data) {
                showConfirmDialog("成功修改密码, 需重新登陆!", {
                    ok: function (dialog) {
                        $cookieStore.remove('x-auth-token');
                        $window.location.href = 'login.html';
                        return true;
                    },
                    cancel: function () {
                        $cookieStore.remove('x-auth-token');
                        $window.location.href = 'login.html';
                        return false;
                    }
                });
            });
        }
    }

});


