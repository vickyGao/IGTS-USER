rootApp.controller('CommodityDetailController', function ($scope, $location, $routeParams) {
    $scope.commodityDetailUrl = '#' + $location.url();
});
