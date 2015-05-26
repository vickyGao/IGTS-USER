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

rootApp.controller('CommodityInfoController', function ($scope, $routeParams, CommodityService, FavoriteService) {
          var commodityId = $routeParams.commodityId;
          $scope.commodityId = commodityId;
          CommodityService.getDetail(commodityId).success(function (data) {
              $scope.commodity = data.commodity;
          });
    //collect commodity
    $scope.collect = function(){
        var defaultFavoritePaginationConfig = {
                page: 0,
                size: 20
            };
        FavoriteService.getForUser(defaultFavoritePaginationConfig).success(function (data) {
            var checkResult = checkAdded(data.pagination.content, commodityId);
            if(checkResult){
                 var request = {
                         "favorite": {
                               "commodityid": commodityId
                         }
                     };
                    FavoriteService.create(request).success(function(data) {
                        showDialog('Success', '收藏成功');
                    });
            }else{
                showDialog('Success', '该收藏已成功');
            }
        });
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

function checkAdded (addedArray, commodityId){
    angular.forEach(addedArray, function (data) {
        if(data.commodityid == commodityId){
            return false;
        }
    });
    return true;
}

var isDescriptionTab = true;
var isMessageTab = false;
