rootApp.controller('OwnerManagementController', function ($scope, $location, $routeParams, $anchorScroll) {

	$scope.$on('event:flushIndentListRequest', function (event, config) {
        $scope.$broadcast('event:flushIndentList', config);
    });
	$scope.$on('event:flushDeliverCommodityListRequest', function (event, config) {
        $scope.$broadcast('event:flushDeliverCommodityList', config);
    });

    /* to get the module's data which user selected request*/
    $scope.$on('event:showIndentListRequest', function (event) {
        $scope.$broadcast('event:showIndentList');
    });
    $scope.$on('event:showDeliverCommodityListRequest', function (event) {
        $scope.$broadcast('event:showDeliverCommodityList');
    });
    
});

rootApp.controller('OwnerSelectOptionController', function ($scope, IndentService) {
	$scope.toShowIndentListRequest = function () {
		$scope.$emit('event:showIndentListRequest');
    };
    $scope.toShowDeliverCommodityListRequest = function () {
		$scope.$emit('event:showDeliverCommodityListRequest');
    };
});

rootApp.controller('ShowModuleController', function ($scope, IndentService) {
    /* to get the module's data which user selected */
    $scope.$on('event:showIndentList',function () {
    	var defaultIndentPaginationConfig = {
                page: 0,
                size: 10
            };
    	$scope.$emit('event:flushIndentListRequest', defaultIndentPaginationConfig);
        $scope.pagename = "pages/owner_indent_template.html";
    });

    $scope.$on('event:showDeliverCommodityList', function (event) {
    	var defaultDeliverCommodityPaginationConfig = {
                page: 0,
                size: 10
            };
    	$scope.$emit('event:flushDeliverCommodityListRequest', defaultDeliverCommodityPaginationConfig);
        //$scope.pagename = "pages/owner_to_deliver_template.html";
    	$scope.pagename = "pages/test2.html";
    });
});




