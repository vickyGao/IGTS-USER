rootApp.controller('mainPageController', function ($scope, $location, HomePageService) {
    $scope.myInterval = 3000;
    HomePageService.getAllSlices().success(function (data) {
        $scope.slides = data.slices;
    });
    HomePageService.getAllHotCommodities().success(function (data) {
        $scope.hotList = data.hotcommodities;
    });
    HomePageService.getAllCustomModules().success(function (data) {
        var customModules = data.custommodules;
        angular.forEach(customModules, function(customModule,index,array){
            angular.forEach(customModule.commodities, function(commodity,index,array){
                angular.forEach(commodity.covers, function(cover,index,array){
                    if (cover.maincoveryn == 'Y') {
                        commodity.coverimageuri = cover.image.uri;
                    }
                });
            });
        });
        console.log(customModules);
        $scope.customModuleList = customModules;
    });
    $scope.doViewCommodityDetail = function (commodityId) {
        $location.path("/commodityDetail/" + commodityId).replace();
    }
});