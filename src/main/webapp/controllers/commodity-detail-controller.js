rootApp.controller('CommodityDetailController', function ($scope, $location, $routeParams, $sce, CommodityService) {
    $scope.commodityDetailUrl = '#' + $location.url();
    var commodityId = $routeParams.commodityId;
    CommodityService.getDetail(commodityId).success(function(data) {
        var commodityDescriptionMarked = '';
        var commodity = '';
        if (data != null) {
            if (data.commodity != null) {
                coverList = data.commodity.covers;
                commodityDescriptionMarked = $sce.trustAsHtml(marked(data.commodity.description));
                commodity = data.commodity;
            }
        }
        $scope.covers = coverList;
        $scope.commodityDescriptionMarked = commodityDescriptionMarked;
        $scope.commodity = commodity;
    });
});

rootApp.controller('CommodityInfoController', function ($scope, $routeParams, CommodityService) {
	var commodityId = $routeParams.commodityId;
    $scope.commodityId = commodityId;
    //收藏
    $scope.collect = function(){
       alert(" 已经收藏商品 " + commodityId);
    };
});

rootApp.controller('CommodityTabController', function ($scope) {
    $scope.isDescriptionTab = isDescriptionTab;
    $scope.isMessageTab = isMessageTab;
    $scope.doDisplayDescription = function () {
        updateCommodityTabSelection(true, false);
        $scope.isDescriptionTab = isDescriptionTab;
        $scope.isMessageTab = isMessageTab;
    }
    $scope.doDisplayMessage = function () {
        updateCommodityTabSelection(false, true);
        $scope.isDescriptionTab = isDescriptionTab;
        $scope.isMessageTab = isMessageTab;
    }
});

function updateCommodityTabSelection(isDescriptionFlag, isMessageFlag) {
    isDescriptionTab = isDescriptionFlag;
    isMessageTab = isMessageFlag;
}

var isDescriptionTab = true;
var isMessageTab = false;
