rootApp.controller('OwnerManagementController', function ($scope, $routeParams) {

	 var ownerDefaultPaginationConfig = {
             page: 0,
             size: 10
         };
     var userId = $routeParams.userId;

     // TODO:  Go different page by $routeParams.tomodule
     switch ($routeParams.tomodule) {
         case 'ownerinfo':
             $scope.$broadcast('event:showUserInfo', userId);
             $scope.pagename = "pages/owner_info_template.html";
             break;
         case 'indentlist':
             $scope.$broadcast('event:flushIndentList', ownerDefaultPaginationConfig);
             $scope.pagename = "pages/owner_indent_template.html";
             break;
         default:
             $scope.$broadcast('event:showUserInfo', userId);
             $scope.pagename = "pages/owner_info_template.html";
             break;
     }

    /* request the selected PAGE */
    // 账户管理
    $scope.$on('event:showOwnerInfoRequest', function (event) {
    	$scope.$broadcast('event:showUserInfo', userId);
        $scope.pagename = "pages/owner_info_template.html";
    });
    $scope.$on('event:showOwnerPictureLibraryRequest', function (event) {
    	$scope.$broadcast('event:flushOwnerPictureLibrary');
        $scope.pagename = "pages/owner_picture_library_template.html";
    });
    $scope.$on('event:showOwnerAddressRequest', function (event) {
    	$scope.$broadcast('event:flushOwnerAddress');
        $scope.pagename = "pages/owner_address_template.html";
    });
    $scope.$on('event:showOwnerBillRequest', function (event) {
   	 // $scope.$broadcast('event:flushOwnerBillList', ownerDefaultPaginationConfig);
       $scope.pagename = "pages/owner_bill_template.html";
   });

    //订单管理
    $scope.$on('event:showIndentListRequest', function (event) {
        //$scope.$broadcast('event:showIndentList');
    	$scope.$broadcast('event:flushIndentList', ownerDefaultPaginationConfig);
        $scope.pagename = "pages/owner_indent_template.html";
    });

    //闲置管理
    $scope.$on('event:showOwnerIgtsRequest', function (event) {
        var igtsPaginationConfig = {
                 page: 0,
                 size: 10,
                 activestate:'ACTIVE'
             };
        $scope.$broadcast('event:flushIgtsList', igtsPaginationConfig);
        $scope.pagename = "pages/owner_igts_template.html";
    });
    $scope.$on('event:showDeliverCommodityListRequest', function (event) {
    	 $scope.$broadcast('event:flushDeliverCommodityList', ownerDefaultPaginationConfig);
         $scope.pagename = "pages/owner_to_deliver_template.html";
    });

    //收藏管理
    $scope.$on('event:showOwnerCommodityRequest', function (event) {
    	 $scope.$broadcast('event:flushOwnerCommodityList', ownerDefaultPaginationConfig);
         $scope.pagename = "pages/owner_favorite_template.html";
    });

    //联系我们
    $scope.$on('event:showContactRequest', function (event) {
    	 $scope.pagename = "pages/contact_template.html";
    });
});

/* the CLICK EVENT in the left page to select the requested page */
rootApp.controller('OwnerSelectOptionController', function ($scope) {
    // 账户管理
    $scope.toShowOwnerInfoRequest = function () {
        $scope.$emit('event:showOwnerInfoRequest');
    };
    $scope.toShowOwnerPictureLibraryRequest = function () {
        $scope.$emit('event:showOwnerPictureLibraryRequest');
    };
    $scope.toShowOwnerAddressRequest = function () {
        $scope.$emit('event:showOwnerAddressRequest');
    };
    $scope.toShowOwnerBillRequest = function () {
        $scope.$emit('event:showOwnerBillRequest');
    };

    //订单管理
    $scope.toShowIndentListRequest = function () {
        $scope.$emit('event:showIndentListRequest');
    };

    //闲置管理
    $scope.toShowOwnerIgtsRequest = function () {
        $scope.$emit('event:showOwnerIgtsRequest');
    };
    $scope.toShowDeliverCommodityListRequest = function () {
        $scope.$emit('event:showDeliverCommodityListRequest');
    };

  //收藏管理
    $scope.toShowOwnerCommodityRequest = function () {
        $scope.$emit('event:showOwnerCommodityRequest');
    };

  //联系我们
    $scope.contactRequest = function () {
        $scope.$emit('event:showContactRequest');
    };
});






