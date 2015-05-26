rootApp.controller('rootController', function ($scope, $location, $routeParams) {
    $scope.doPublish = function () {
        window.location.href = 'publish-commodity.html';
    }
    $scope.$on('event:loginRequired', function () {
        window.location.href = 'login.html';
    });

    $scope.doSearch = function () {
        commoditySearchTerm = $scope.searchContent;
        var commoditySearchTag = $routeParams.tag;
            var uri = {search_term: commoditySearchTerm, tag : commoditySearchTag, sortby : 'RELEASE_DATE', orderby : 'DESC'};
            $location.path('/search').search(uri);
    };

   $scope.$on('event:ResetSearchTerm', function (event, searchTerm) {
          $scope.searchContent = searchTerm;
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
