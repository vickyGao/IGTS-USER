rootApp.controller('CommodityDetailController', function ($scope, $routeParams, CommodityService) {
    var commodityId = $routeParams.commodityId;
    $scope.commodityId = commodityId;
});

rootApp.controller('CommodityInfoController', function ($scope, $routeParams, CommodityService, FavoriteService) {
          var commodityId = $routeParams.commodityId;
          $scope.commodityId = commodityId;
          CommodityService.getDetail(commodityId).success(function (data) {
              $scope.commodity = data.commodity;
          });
    //collect commodity
    $scope.collect = function(){
          var request = {
                  "favorite": {
                        "commodityid": commodityId
                  }
              };
                 alert(" 这一块要加check，看是否已经被收藏过~~ ");
             FavoriteService.create(request).success(function (data) {
                   alert(" 已经收藏商品 " + commodityId);
           });
    };
});
