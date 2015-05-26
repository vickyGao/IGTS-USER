rootApp.controller('SearchCommodityManagementController', function ($scope, $routeParams) {
    var commoditySearchTerm = $routeParams.search_term;
    var commoditySearchTag = $routeParams.tag;
    $scope.sort_by = 'RELEASE_DATE';
    $scope.order_by = 'DESC';
    $scope.selected = "最新";
    $scope.searchcrumbs = commoditySearchTerm;

    $scope.getCommoditySort = function(sortField){
        switch (sortField) {
        case '最新':
            $scope.sort_by = 'RELEASE_DATE';
            $scope.order_by = "DESC";
            $scope.selected = "最新";
            break;
        case '收藏数':
            $scope.sort_by = 'COLLECTION_NUMBER';
            $scope.order_by = "DESC";
            $scope.selected = "收藏数";
            break;
        case '价钱从高到低':
            $scope.sort_by = 'PRICE';
            $scope.order_by = "DESC";
            $scope.selected = "价钱从高到低";
            break;
        case '价钱从低到高':
            $scope.sort_by = 'PRICE';
            $scope.order_by = "ASC";
            $scope.selected = "价钱从低到高";
            break;
        }
        var config = {
                search_term: commoditySearchTerm,
                tagid : commoditySearchTag,
                sortby: $scope.sort_by,
                orderby: $scope.order_by
            };
        $scope.$broadcast('event:flushCommodityList', config);
    }

    $scope.$emit('event:ResetSearchTerm', commoditySearchTerm);

    $scope.$on('event:showCommodityPaginationRequest', function (event, currentPage, totalPages) {
        $scope.$broadcast('event:showCommodityPagination', currentPage, totalPages);
    });
    $scope.$on('event:flushCommodityListRequest', function (event, config) {
        config['sortby'] =  $scope.sort_by;
        config['orderby'] = $scope.order_by;
        $scope.$broadcast('event:flushCommodityList', config);
    });
});

rootApp.controller('SearchCommodityListController', function ($scope, CommodityService, $routeParams) {
    var config = {
        search_term:  $routeParams.search_term,
        tagid : $routeParams.tag,
        sortby:'RELEASE_DATE',
        orderby: 'DESC'
    };

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
        if ($scope.commodityList.length != 0){
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
        }
    });
});

rootApp.controller('SearchCommodityPaginationController', function ($scope) {
    var totalPageNumber = 0;
    $scope.isShow = false;
    $scope.$on('event:showCommodityPagination', function (event, currentPage, totalPages) {
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
