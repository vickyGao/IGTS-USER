rootApp.controller('OwnerInfoManagementController', function ($scope, $routeParams, $cookieStore, $window, UserService ) {
    $scope.isUpdatePass = false;
    $scope.isEditInfo = false;
    $scope.activeTab = 'OWNER_INFO_TAB';
    var loginUserId = $routeParams.userId;
    $scope.user = {
            'id' : loginUserId
    };

    UserService.getDetail(loginUserId).success(function (data) {
        $scope.isEditInfo = false;
        $scope.user = data.user;
    });

    $scope.$on('event:showUserInfo', function (event, userId) {
        UserService.getDetail(userId).success(function (data) {
            $scope.isEditInfo = false;
            $scope.user = data.user;
        });
    });

    $scope.$on('event:showUserAsset', function (event) {
        UserService.getForAsset().success(function (data) {
            $scope.activeTab = 'OWNER_ASSET_TAB';
            $scope.asset = data.asset;
        });
    });

    $scope.showOwnerState = function(tabname){
        $scope.activeTab = tabname;
        switch (tabname) {
        case 'OWNER_INFO_TAB':
            $scope.$emit('event:showUserInfo', loginUserId);
            break;
        case 'OWNER_SAFE_TAB':
            getRegExpResult($scope.user.password);
            break;
        case 'OWNER_ASSET_TAB':
            $scope.$emit('event:showUserAsset');
            break;
        }
    }


    /* update user info*/
    $scope.showEditInfo = function(showeditstate){
        $scope.isEditInfo = !showeditstate;
    }

    $scope.sureUpdateInfo = function(){
           var updateDetailRequest = {
                   "user": $scope.user
               };
           UserService.updateDetail(updateDetailRequest).success(function (data) {
               $scope.isEditInfo = false;
               $scope.$emit('event:showUserInfo', loginUserId);
           });
   }

   $scope.cancelUpdateInfo = function(){
       $scope.isEditInfo = false;
   }


   /* update user password*/
   $scope.showUpdateass = function(updatePassState){
       $scope.isUpdatePass = !updatePassState;
   }

   $scope.cancelUpdatePass = function(){
       getRegExpResult($scope.user.password);
       $scope.isUpdatePass = false;
      }

   $scope.getSafeLevel= function(){
        getRegExpResult($scope.newpass.newPass);
    }

    $scope.sureUpdatePass = function(){
         if(!$scope.newpass.oldPass || !$scope.newpass.newPass || !$scope.newpass.surePass){
             return; //The 3 fields cannot be empty
         }else if($scope.newpass.newPass != $scope.newpass.surePass){
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



function getRegExpResult(content){
     var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g"); 
     var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g"); 
     var enoughRegex = new RegExp("(?=.{6,}).*", "g"); 

     if (false == enoughRegex.test(content)) { 
         $('#level').removeClass('pw-weak'); 
         $('#level').removeClass('pw-medium'); 
         $('#level').removeClass('pw-strong'); 
         $('#level').addClass(' pw-defule'); 
     } else if (strongRegex.test(content)) { 
         $('#level').removeClass('pw-weak'); 
         $('#level').removeClass('pw-medium'); 
         $('#level').removeClass('pw-strong'); 
         $('#level').addClass(' pw-strong'); 
     } else if (mediumRegex.test(content)) { 
         $('#level').removeClass('pw-weak'); 
         $('#level').removeClass('pw-medium'); 
         $('#level').removeClass('pw-strong'); 
         $('#level').addClass(' pw-medium'); 
     } else { 
         $('#level').removeClass('pw-weak'); 
         $('#level').removeClass('pw-medium'); 
         $('#level').removeClass('pw-strong'); 
         $('#level').addClass('pw-weak'); 
     } 
     return true; 
}

