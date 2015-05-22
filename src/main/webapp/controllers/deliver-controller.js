rootApp.controller('ToDeliverCommodityManagementController', function ($scope, IndentService ) {
    var defaultIndentPaginationConfig = {
            page: 0,
            size: 10
        };

    IndentService.getTenantForSeller(defaultIndentPaginationConfig).success(function (data) {
        $scope.deliverCommodityList  = getDeliverIndents( new Array(), data.pagination.content);
        var currentPage = data.pagination.currentpage;
        var totalPages = data.pagination.pagecount;
       $scope.$broadcast('event:showDeliverCommodityPagination', currentPage, totalPages);
 });

    $scope.$on('event:flushDeliverCommodityList',function (event, config) {
        IndentService.getTenantForSeller(config).success(function (data) {
                 $scope.deliverCommodityList  = getDeliverIndents( new Array(), data.pagination.content);
                 var currentPage = data.pagination.currentpage;
                 var totalPages = data.pagination.pagecount;
                $scope.$broadcast('event:showDeliverCommodityPagination', currentPage, totalPages);
          });
      });

    $scope.toDeliver = function(indentId){
        showConfirmDialog("是否确定发货!", {
            ok: function (dialog) {
                indentStatusEnum = 'DELIVERED';
                IndentService.updateIndentStatus(indentStatusEnum, indentId).success(function (data) {
                   $scope.$emit('event:flushDeliverCommodityList', defaultIndentPaginationConfig);
               });
                return true;
            },
            cancel: function () {
                return false;
            }
        });
      };
});


rootApp.controller('DeliverCommodityPaginationMessageController', function ($scope) {
    $scope.isShow = false;
    $scope.$on('event:showDeliverCommodityPagination',function (event, currentPage, totalPages) {
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
            $scope.$emit('event:flushDeliverCommodityList', config);
        }
        return;
    };
});

function getDeliverIndents(array, content){
	var morestatus = null;
    angular.forEach(content, function (indent) {
        if(indent.status == '已付款' && indent.delivertime == null){
            switch (indent.status) {
	        case '已付款':
	            morestatus = "待发货";
	            break;
	        case '已发货':
	            morestatus = "查看物流";
	            break;
            }
        indent.morestatus = morestatus;
        array.push(indent);
        }
    });
    return array;
}
