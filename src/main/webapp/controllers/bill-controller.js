rootApp.controller('OwnerBillManagementController', function ($scope, BillService) {

    BillService.getListForUser(defaultBillPaginationConfig).success(function (data) {
         $scope.billList  = data.pagination.content;
         var currentPage = data.pagination.currentpage;
         var totalPages = data.pagination.pagecount;
         $scope.$broadcast('event:showBillPagination', currentPage, totalPages);
    });

     $scope.$on('event:flushOwnerBillList',function (event, config) {
         BillService.getListForUser(defaultBillPaginationConfig).success(function (data) {
             $scope.billList  = data.pagination.content;
             var currentPage = data.pagination.currentpage;
             var totalPages = data.pagination.pagecount;
             $scope.$broadcast('event:showBillPagination', currentPage, totalPages);
         });
     });

        $scope.deleteBill =  function(billId){
            BillService.deleteBill(billId).success(function () {
                 $scope.$emit('event:flushOwnerBillList', defaultFavoritePaginationConfig);
             });
        };

});

rootApp.controller('OwnerBillPaginationController', function ($scope) {
    $scope.isShow = false;
    $scope.$on('event:showBillPagination',function (event, currentPage, totalPages) {
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
            $scope.$emit('event:flushOwnerBillList', config);
        }
        return;
    };
});


var defaultBillPaginationConfig = {
        page: 0,
        size: 10
    };
