rootApp.controller('OwnerManagementController', function ($scope, $routeParams) {

	 var ownerDefaultPaginationConfig = {
             page: 0,
             size: 10
         };
     var userId = $routeParams.userId;

     // TODO:  Go different page by $routeParams.tomodule
     switch ($routeParams.tomodule) {
         case 'info':
             $scope.$broadcast('event:showUserInfo', userId);
             $scope.pagename = "pages/owner_info_template.html";
             break;
         case 'picture':
             $scope.$broadcast('event:flushOwnerPictureLibrary');
             $scope.pagename = "pages/owner_picture_library_template.html";
             break;
         case 'address':
             $scope.$broadcast('event:flushOwnerAddress');
             $scope.pagename = "pages/owner_address_template.html";
             break;
         case 'bill':
             $scope.$broadcast('event:flushOwnerBillList', ownerDefaultPaginationConfig);
             $scope.pagename = "pages/owner_bill_template.html";
             break;
         case 'indentlist':
             $scope.$broadcast('event:flushIndentList', ownerDefaultPaginationConfig);
             $scope.pagename = "pages/owner_indent_template.html";
             break;
         case 'igts':
             var igtsPaginationConfig = {
                 page: 0,
                 size: 10,
                 activestate:'ACTIVE'
             };
	        $scope.$broadcast('event:flushIgtsList', igtsPaginationConfig);
	        $scope.pagename = "pages/owner_igts_template.html";
             break;
         case 'deliver':
             $scope.$broadcast('event:flushDeliverCommodityList', ownerDefaultPaginationConfig);
             $scope.pagename = "pages/owner_to_deliver_template.html";
             break;
         case 'favorite':
             $scope.$broadcast('event:flushOwnerCommodityList', ownerDefaultPaginationConfig);
             $scope.pagename = "pages/owner_favorite_template.html";
             break;
         case 'contact':
             $scope.pagename = "pages/contact_template.html";
             break;
         default:
             $scope.$broadcast('event:showUserInfo', userId);
             $scope.pagename = "pages/owner_info_template.html";
             break;
     }
});

/* the CLICK EVENT in the left page to select the requested page */
rootApp.controller('OwnerSelectOptionController', function ($scope, $routeParams, $location) {
    var userId = $routeParams.userId;
    // 账户管理
    $scope.toShowOwnerInfoRequest = function () {
        $location.path("/ownerinfo/" + userId +"/info").replace();
    };
    $scope.toShowOwnerPictureLibraryRequest = function () {
        $location.path("/ownerinfo/" + userId +"/picture").replace();
    };
    $scope.toShowOwnerAddressRequest = function () {
        $location.path("/ownerinfo/" + userId +"/address").replace();
    };
    $scope.toShowOwnerBillRequest = function () {
        $location.path("/ownerinfo/" + userId +"/bill").replace();
    };

    //订单管理
    $scope.toShowIndentListRequest = function () {
        $location.path("/ownerinfo/" + userId +"/indentlist").replace();
    };

    //闲置管理
    $scope.toShowOwnerIgtsRequest = function () {
        $location.path("/ownerinfo/" + userId +"/igts").replace();
    };
    $scope.toShowDeliverCommodityListRequest = function () {
    	$location.path("/ownerinfo/" + userId +"/deliver").replace();
    };

  //收藏管理
    $scope.toShowOwnerCommodityRequest = function () {
        $location.path("/ownerinfo/" + userId +"/favorite").replace();
    };

  //联系我们
    $scope.contactRequest = function () {
        $location.path("/ownerinfo/" + userId +"/contact").replace();
    };
});






