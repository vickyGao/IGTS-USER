rootApp.controller('rootController', function ($scope) {
});

rootApp.controller('headerController', function ($scope, $location, authHttp, UserService, AuthorizationService) {
	UserService.getByToken().success(function (data) {
        $scope.user = data.user;
    });
    $scope.tologin = function () {
    	window.location.href = 'login.html';
    };
    $scope.doLogout = function () {
        AuthorizationService.logout();
        $location.path("/main").replace();
    };
});
