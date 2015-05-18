rootApp.controller('CommoditySearchController', function ($scope, $location, $routeParams) {
    $scope.searchContent = commoditySearchTerm;
    $scope.doSearch = function () {
        commoditySearchTerm = $scope.searchContent;
        if (commoditySearchTerm != null && commoditySearchTerm != '') {
            $location.path("/search/"+commoditySearchTerm).replace();
            var config = {
                search_term: $routeParams.search_term
            };
            $scope.$emit('event:flushCommodityListRequest', config);
        } else {
            $location.path("/").replace();
        }
    };
    $scope.$on('event:ResetSearchTerm', function (event, searchTerm) {
        $scope.searchContent = searchTerm;
    });
});

rootApp.controller('SearchCommodityManagementController', function ($scope) {
    $scope.$on('event:showCommodityPaginationRequest', function (event, currentPage, totalPages) {
        $scope.$broadcast('event:showCommodityPagination', currentPage, totalPages);
    });
});

rootApp.controller('SearchCommodityListController', function ($scope, CommodityService, $routeParams) {
    commoditySearchTerm = $routeParams.search_term;
    var config = {
        search_term: commoditySearchTerm
    };
    $scope.$emit('event:ResetSearchTermRequest', commoditySearchTerm);
    CommodityService.query(config).success(function (data) {
        var commodityList = data.queryresult.content;
        angular.forEach(commodityList, function (commodity, index, array) {
            angular.forEach(commodity.covers, function (cover, index, array) {
                if (cover.maincoveryn == 'Y') {
                    commodity.mainCover = cover;
                }
            });
        });
        $scope.commodityList = commodityList;
        var currentPage = data.queryresult.currentpage;
        var totalPages = data.queryresult.totalpages;
        $scope.$emit('event:showCommodityPaginationRequest', currentPage, totalPages);
    });
    $scope.$on('event:flushCommodityList', function (event, config) {
        CommodityService.query(config).success(function (data) {
            var commodityList = data.queryresult.content;
            angular.forEach(commodityList, function (commodity, index, array) {
                angular.forEach(commodity.covers, function (cover, index, array) {
                    if (cover.maincoveryn == 'Y') {
                        commodity.mainCover = cover;
                    }
                });
            });
            $scope.commodityList = commodityList;
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
        if ((currentPage == totalPages - 1) || totalPages == 0) {
            $scope.isLastPage = true;
        }
        currentCommodityPageGlobal = currentPage;
    });
    $scope.doJumpPage = function (pageNumber) {
        pageNumber -= 1;
        if (pageNumber >= 0 && pageNumber < totalPageNumber) {
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
var currentCommodityPageGlobal = 0;
