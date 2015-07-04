rootApp.controller('IndentManagementController', function ($scope, IndentService) {
     var defaultIndentPaginationConfig = {
             page: 0,
             size: 10
         };
     IndentService.getTenantForUser(defaultIndentPaginationConfig).success(function (data) {
          $scope.indentList  = getIndents( new Array(), data.pagination.content);
          var currentPage = data.pagination.currentpage;
          var totalPages = data.pagination.pagecount;
          $scope.$broadcast('event:showIndentPagination', currentPage, totalPages);
          });
     $scope.$on('event:flushIndentList',function (event, config) {
         IndentService.getTenantForUser(config).success(function (data) {
             $scope.indentList  = getIndents( new Array(), data.pagination.content);
                  var currentPage = data.pagination.currentpage;
                  var totalPages = data.pagination.pagecount;
                  $scope.$broadcast('event:showIndentPagination', currentPage, totalPages);
               });
       });
     $scope.updateStatus = function(dealoperate, indentId){
         showConfirmDialog("是否" + dealoperate + "?", {
             ok: function (dialog) {
                 var indentStatusEnum = 'UNPAID';
                 var payTypeConfig =null;
                 switch (dealoperate) {
                     case '确认付款':
                         indentStatusEnum = 'PAID';
                         payTypeConfig = {
                             paytype : 'DEFAULT'
                         };
                         break;
                     case '确认收货':
                         indentStatusEnum = 'COMPLETE';
                         break;
                     case '确认退款':
                         indentStatusEnum = 'COMPLETE';
                         break;
                 }
                 IndentService.updateIndentStatus(indentStatusEnum, indentId, payTypeConfig).success(function (data) {
                     $scope.$emit('event:flushIndentList', defaultIndentPaginationConfig);
                  });
                 return true;
             },
             cancel: function () {
                 return false;
             }
         });
     };

     $scope.cancelIndent = function(indentid){
         showConfirmDialog("确定取消订单?", {
             ok: function (dialog) {
                 IndentService.updateIndentStatus('CANCELLED', indentid, null).success(function (data) {
                     $scope.$emit('event:flushIndentList', defaultIndentPaginationConfig);
                  });
                 return true;
             },
             cancel: function () {
                 return false;
             }
         });
     };

     $scope.returnGoods = function(indentid){
         showConfirmDialog("确定退款/退货?", {
             ok: function (dialog) {
                  IndentService.updateIndentStatus('RETURNING', indentid, null).success(function (data) {
                     $scope.$emit('event:flushIndentList', defaultIndentPaginationConfig);
                  });
                 return true;
             },
             cancel: function () {
                 return false;
             }
         });
     };

     $scope.showIndentModel = function(indentid){
    	     $scope.$broadcast('event:showDetailIndent', indentid);
	    	 $('#DetailIndentModal').modal('show');
	 };

   //TODO:  
/*  $scope.deleteIndent = function(indentId){
         showConfirmDialog("是否确定删除该订单？", {
             ok: function (dialog) {
                 IndentService.delete(indentId).success(function () {
                     $scope.$emit('event:flushIndentList', defaultIndentPaginationConfig);
                 });
                 return true;
             },
             cancel: function () {
                 return false;
             }
         });
     };*/
});

rootApp.controller('DetailIndentController', function ($scope, IndentService) {
	
	 $scope.$on('event:showDetailIndent',function (event, indentid) {
		 IndentService.getTenantById(indentid).success(function (data) {
		        $scope.viewIndent = data.indent;
		});
	 });
});
	
/*recurrence to get all the indent*/
rootApp.controller('IndentPaginationManagementController', function ($scope) {
        $scope.isShow = false;
        $scope.$on('event:showIndentPagination',function (event, currentPage, totalPages) {
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
                $scope.$emit('event:flushIndentList', config);
            }
            return;
        };
    });

function getIndents(array, content){
    angular.forEach(content, function (indent) {
        var buttonMessage = null;
        var morestatus = null;
        switch (indent.status) {
        case '未付款':
            buttonMessage = '确认付款';
            break;
        case '已付款':
            morestatus = "待发货";
            break;
        case '已发货':
            buttonMessage = '确认收货';
            break;
        case '退货中':
            buttonMessage = '确认退款';
            break;
        }
        indent.morestatus = morestatus;
        indent.dealoperate = buttonMessage;
        array.push(indent);
    });
    return array;
}
