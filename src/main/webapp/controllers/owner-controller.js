rootApp.controller('OwnerManagementController', function ($scope, $location, $routeParams, $anchorScroll) {
    var orderModel = $routeParams.anchorId;
    $location.hash(orderModel);
    $anchorScroll();

    $scope.viewModule = function(moduleId){
        $location.hash(moduleId);
        $anchorScroll();
    };

    $scope.$on('event:showIndentPaginationRequest', function (event, price, carriage) {
        $scope.$broadcast('event:showIndentPagination', price, carriage);
    });
    $scope.$on('event:flushIndentListRequest', function (event, config) {
        $scope.$broadcast('event:flushIndentList', config);
    });
});

rootApp.controller('IndentManagementController', function ($scope, IndentService) {
     var config = {
             page: 0,
             size: 10,
         };
     IndentService.getTenantForUser(config).success(function (data) {
          $scope.indentList  = getIndents( new Array(), data.pagination.content);
          var currentPage = data.pagination.currentpage;
          var totalPages = data.pagination.pagecount;
          $scope.$emit('event:showIndentPaginationRequest', currentPage, totalPages);
          });
     $scope.$on('event:flushIndentList',function (event, config) {
         IndentService.getTenantForUser(config).success(function (data) {
             $scope.indentList  = getIndents( new Array(), data.pagination.content);
                  var currentPage = data.pagination.currentpage;
                  var totalPages = data.pagination.pagecount;
                  $scope.$emit('event:showIndentPaginationRequest', currentPage, totalPages);
               });
       });
});

    /*recurrence to get all the indent*/
rootApp.controller('IndentPaginationMessageController', function ($scope, $routeParams, MessageService) {
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
                $scope.$emit('event:flushIndentListRequest', config);
            }
            return;
        };
    });

function getIndents(array, content){
    angular.forEach(content, function (indent) {
        var buttonMessage = null;
        if(indent.paytime == null){
            buttonMessage = "确认付款";
        }else if(indent.paytime != null && indent.dealcompletetime == null){
            buttonMessage = "确认收货";
        }
        indent.dealoperate = buttonMessage;
        array.push(indent);
    });
    return array;
}