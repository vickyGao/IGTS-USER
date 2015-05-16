rootApp.controller('CommoditySearchController', function ($scope, $location) {
    $scope.searchContent = commoditySearchTerm;
    $scope.doSearch = function () {
        commoditySearchTerm = $scope.searchContent
        if (commoditySearchTerm != null && commoditySearchTerm != '') {
            $location.path("/search/"+commoditySearchTerm).replace();
        }
    };
});

rootApp.controller('SearchCommodityManagementController', function ($scope, $routeParams) {
    commoditySearchTerm = $routeParams.search_term;
	var config = {
            search_term: $routeParams.search_term
        };
	$scope.$broadcast('event:flushCommodityList', config);
	$scope.$on('event:showCommodityPaginationRequest', function (event, currentPage, totalPages) {
        $scope.$broadcast('event:showCommodityPagination', currentPage, totalPages);
    });
});

rootApp.controller('SearchCommodityListController', function ($scope, CommodityService) {
    $scope.$on('event:flushCommodityList', function (event, config) {
        console.log('get flush request');
        CommodityService.query(config).success(function (data) {
            $scope.commodityList = data.queryresult.content;
            var currentPage = data.queryresult.currentpage;
            var totalPages = data.queryresult.totalpages;
            $scope.$emit('event:showCommodityPaginationRequest', currentPage, totalPages);
        });
    });
});

rootApp.controller('SearchCommodityPaginationController', function ($scope) {
    var totalPageNumber = 0;
    $scope.$on('event:showCommodityPagination', function (event, currentPage, totalPages) {
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
        if (currentPage == totalPages - 1) {
            $scope.isLastPage = true;
        }
        currentCommodityPageGlobal = currentPage;
    });
    $scope.doJumpPage = function (pageNumber) {
        pageNumber -= 1;
        if (pageNumber < 0) {
            showDialog('Warning', '当前为首页');
        } else if (pageNumber >= totalPageNumber) {
            showDialog('Warning', '当前为尾页');
        } else {
            var config = {
                search_term: commoditySearchTerm,
                page: pageNumber
            }
            $scope.$emit('event:flushCommodityListRequest', config);
        }
        return;
    }
});

var commoditySearchTerm = '';
