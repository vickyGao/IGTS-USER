rootApp.controller('CommodityDetailController', function ($scope, $location, $routeParams) {
    $scope.commodityDetailUrl = '#' + $location.url();
});

rootApp.controller('CommodityInfoController', function ($scope, $routeParams, CommodityService) {
	var commodityId = $routeParams.commodityId;
    $scope.commodityId = commodityId;
    //收藏
    $scope.collect = function(){
       alert(" 已经收藏商品 " + commodityId);
    };
});
