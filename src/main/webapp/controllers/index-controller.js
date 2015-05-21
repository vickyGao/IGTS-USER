rootApp.controller('rootController', function ($scope, $location) {
    $scope.$on('event:flushCommodityListRequest', function (event, config) {
        $scope.$broadcast('event:flushCommodityList', config);
    });
    $scope.$on('event:ResetSearchTermRequest', function (event, searchTerm) {
        $scope.$broadcast('event:ResetSearchTerm', searchTerm);
    });
    $scope.doPublish = function () {
        window.location.href = 'publish-commodity.html';
    }
    $scope.$on('event:loginRequired', function () {
        window.location.href = 'login.html';
    });
});

rootApp.controller('headerController', function ($scope, $location, authHttp, UserService, AuthorizationService) {
	UserService.getByToken().success(function (data) {
        $scope.user = data.user;
    });
    $scope.tologin = function () {
    	window.location.href = 'login.html';
    };
    $scope.toRegister = function () {
        window.location.href = 'register.html';
    };
    $scope.doLogout = function () {
        AuthorizationService.logout();
        $location.path("/main").replace();
    };
});
