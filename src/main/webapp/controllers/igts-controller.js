rootApp.controller('OwnerIgtsManagementController', function ($scope, CommodityService) {
     var defaultIgtsPaginationConfig = {
                page: 0,
                size: defaultPageSize,
                activestate:'ACTIVE'
            };
      $scope.activeTab = 'ACTIVE';

      CommodityService.getAllForUser(defaultIgtsPaginationConfig).success(function (data) {
          switch ($scope.activeTab) {
              case 'ACTIVE':
                   $scope.activeCommodityList = data.pagination.content;
                   var currentPage = data.pagination.currentpage;
                   var totalPages = data.pagination.pagecount;
                   $scope.$broadcast('event:showActiveIgtsPagination', currentPage, totalPages, $scope.activeTab);
                  break;
              case 'NEGATIVE':
                   $scope.unActiveCommodityList = data.pagination.content;
                   var currentPage = data.pagination.currentpage;
                   var totalPages = data.pagination.pagecount;
                   $scope.$broadcast('event:showUnActiveIgtsPagination', currentPage, totalPages, $scope.activeTab);
                  break;
          }  
    });

      $scope.$on('event:flushIgtsList',function (event, config) {
          CommodityService.getAllForUser(config).success(function (data) {
                switch ($scope.activeTab) {
                    case 'ACTIVE':
                         $scope.activeCommodityList = data.pagination.content;
                         var currentPage = data.pagination.currentpage;
                         var totalPages = data.pagination.pagecount;
                         $scope.$broadcast('event:showActiveIgtsPagination', currentPage, totalPages, $scope.activeTab);
                        break;
                    case 'NEGATIVE':
                         $scope.unActiveCommodityList = data.pagination.content;
                         var currentPage = data.pagination.currentpage;
                         var totalPages = data.pagination.pagecount;
                         $scope.$broadcast('event:showUnActiveIgtsPagination', currentPage, totalPages, $scope.activeTab);
                        break;
                }  
          });
      });
      $scope.showIgtsForState = function(tabname){
          $scope.activeTab = tabname;
          defaultIgtsPaginationConfig['activestate'] = tabname;
          $scope.$emit('event:flushIgtsList', defaultIgtsPaginationConfig);
      };
      $scope.updateCommodityActiveState = function(state, commodityId){
          var showTab = 'ACTIVE';
          var showMessage = null;
          switch (state) {
            case 'ACTIVE':
                showTab = 'ACTIVE';
                showMessage = '是否确定上架该商品？';
                break;
            case 'NEGATIVE':
                showTab = 'NEGATIVE';
                showMessage = '是否确定下架该商品？';
                break;
           }
            showConfirmDialog(showMessage, {
                ok: function (dialog) {
                  CommodityService.updateCommodityActiveState(state, commodityId).success(function (data) {
                      $scope.activeTab = showTab;
                      defaultIgtsPaginationConfig['activestate'] = showTab;
                      $scope.$emit('event:flushIgtsList', defaultIgtsPaginationConfig);
                  });
                    return true;
                },
                cancel: function () {
                    return false;
                }
            });
      };
      $scope.deleteIgts = function(commodityId){
          showConfirmDialog("是否确定删除该商品？", {
              ok: function (dialog) {
                  CommodityService.delete(commodityId).success(function () {
                       $scope.$emit('event:flushIgtsList', defaultIgtsPaginationConfig);
                  });
                  return true;
              },
              cancel: function () {
                  return false;
              }
          });
      }
});


rootApp.controller('OwnerActiveIgtsPaginationController', function ($scope) {
    $scope.isShow = false;
    $scope.$on('event:showActiveIgtsPagination',function (event, currentPage, totalPages) {
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
    $scope.doJumpPage = function (pageNumber, activeTab) {
        pageNumber -= 1;
        if (pageNumber >= 0 && pageNumber < totalPageNumber) {
             var config = {
                     page: pageNumber,
                     size: defaultPageSize,
                     activestate:activeTab
                 };
            $scope.$emit('event:flushIgtsList', config);
        }
        return;
    };
});

rootApp.controller('OwnerUnActiveIgtsPaginationController', function ($scope) {
    $scope.isShow = false;
    $scope.$on('event:showUnActiveIgtsPagination',function (event, currentPage, totalPages) {
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
    $scope.doJumpPage = function (pageNumber, activeTab) {
        pageNumber -= 1;
        if (pageNumber >= 0 && pageNumber < totalPageNumber) {
             var config = {
                     page: pageNumber,
                     size: defaultPageSize,
                     activestate:activeTab
                 };
            $scope.$emit('event:flushIgtsList', config);
        }
        return;
    };
});

var defaultPageSize = 10;