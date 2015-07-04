rootApp.controller('rootController', function ($scope, $location, $routeParams, $cookieStore) {
    $scope.doPublish = function () {
        var token = $cookieStore.get('x-auth-token');
        if(token != null){
            window.location.href = 'publish-commodity.html';
        }else{
            window.location.href = 'login.html';
         }
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

rootApp.controller('headerController', function ($scope, $location, $cookieStore, authHttp, UserService, AuthorizationService) {
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
        $cookieStore.remove('x-auth-token');
        window.location.href = 'index.html';
    };
});
