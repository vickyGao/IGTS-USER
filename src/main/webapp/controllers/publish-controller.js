rootApp.controller('rootController', function ($scope) {
    $scope.$on('event:ShowCreateCoverModalRequest', function (event, commodityId) {
        $scope.$broadcast('event:ShowCreateCoverModal', commodityId);
    });
});

rootApp.controller('headerController', function ($scope, UserService, AuthorizationService) {
    UserService.getByToken().success(function (data) {
        $scope.user = data.user;
    });
    $scope.tologin = function () {
        window.location.href = 'login.html';
    };
    $scope.doLogout = function () {
        AuthorizationService.logout();
        window.location.href = 'index.html';
    };
});

rootApp.controller('publishController', function ($scope, CommodityService) {
    $scope.doSubmit = function () {
        var postBody = {
            commodity: $scope.commodity
        }
        CommodityService.create(postBody).success(function (data) {
            $scope.$emit('event:ShowCreateCoverModalRequest', data.commodity.id);
        });
    }
});

rootApp.controller('CreateCoverModalController', function ($scope) {
    console.log('111');
});