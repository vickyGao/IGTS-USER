rootApp.controller('OwnerFavoriteManagementController', function ($scope, $location, $routeParams, FavoriteService) {

      FavoriteService.getForUser(defaultFavoritePaginationConfig).success(function (data) {
        $scope.favoriteCommodityList  = data.pagination.content;
        var currentPage = data.pagination.currentpage;
        var totalPages = data.pagination.pagecount;
        $scope.$broadcast('event:showFavoritePagination', currentPage, totalPages);
    });

       $scope.$on('event:flushFavoriteList',function (event, config) {
             FavoriteService.getForUser(config).success(function (data) {
                    $scope.favoriteCommodityList  = data.pagination.content;
                    var currentPage = data.pagination.currentpage;
                    var totalPages = data.pagination.pagecount;
                    $scope.$broadcast('event:showFavoritePagination', currentPage, totalPages);
                });
       });
       
       $scope.deleteFavoriteCommodity=  function(commodityid){
    	   var sureUpdate = window.confirm("是否确定取消收藏?");
           if(sureUpdate == true){
        	   alert("ok");
           }
       };

});


rootApp.controller('OwnerFavoritePaginationController', function ($scope) {
    $scope.isShow = false;
    $scope.$on('event:showFavoritePagination',function (event, currentPage, totalPages) {
        if(totalPages != 0){
            $scope.isShow = true;
        }
        $scope.isFirstPage = false;
        $scope.isLastPage = false;
        var pageArray = [];
        totalPageNumber = totalPages;
        if (totalPages > 10) {
            for (i = 1; i <= 10; i++) {
                var currentPageFlag = false;
                if (i - 1 == currentPage) {
                    currentPageFlag = true;
                }
                pageArray[i - 1] = {
                    pageNumber: i,
                    isCurrentPage: currentPageFlag
                }
            }
        } else {
            for (i = 1; i <= totalPages; i++) {
                var currentPageFlag = false;
                if (i - 1 == currentPage) {
                    currentPageFlag = true;
                }
                pageArray[i - 1] = {
                    pageNumber: i,
                    isCurrentPage: currentPageFlag
                }
            }
        }
        $scope.previousPageNumber = currentPage;
        $scope.NextPageNumber = currentPage + 2;
        $scope.pages = pageArray;
        if (currentPage == 0) {
            $scope.isFirstPage = true;
        }
        if ((currentPage == totalPages - 1) || totalPages == 0) {
            $scope.isLastPage = true;
        }
    });
    $scope.doJumpPage = function (pageNumber) {
        pageNumber -= 1;
        if (pageNumber >= 0 && pageNumber < totalPageNumber) {
             var config = {
                     page: pageNumber,
                     size: 10
                 };
            $scope.$emit('event:flushFavoriteList', config);
        }
        return;
    };
});


var defaultFavoritePaginationConfig = {
        page: 0,
        size: 10
    };