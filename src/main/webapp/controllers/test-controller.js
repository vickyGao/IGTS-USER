rootApp.controller('testMainController', function ($scope, $routeParams, $location, $anchorScroll) {

    /* to get the module's data which user selected request*/
    $scope.$on('event:getModule1DataRequest', function (event) {
        $scope.$broadcast('event:getModule1Data');
    });
    
    $scope.$on('event:getModule2DataRequest', function (event) {
        $scope.$broadcast('event:getModule2Data');
    });
    
    $scope.$on('event:getModule3DataRequest', function (event) {
        $scope.$broadcast('event:getModule3Data');
    });
    
    $scope.$on('event:getModule4DataRequest', function (event) {
        $scope.$broadcast('event:getModule4Data');
    });
});

rootApp.controller('testSelectController', function ($scope) {
    $scope.showModule1 = function () {
    	$scope.$emit('event:getModule1DataRequest');
    };
    $scope.showModule2 = function () {
        $scope.$emit('event:getModule2DataRequest');
    };
    $scope.showModule3 = function () {
        $scope.$emit('event:getModule3DataRequest');
    };
    $scope.showModule4 = function () {
        $scope.$emit('event:getModule4DataRequest');
    };
});

rootApp.controller('testShowController', function ($scope, $location, $anchorScroll) {
    /* to get the module;s data which user selected */
     $scope.$on('event:getModule1Data',function (event) {
         //TODO: to get the model1 data
         $scope.pagename = "pages/owner_indent_template.html";
     });
     $scope.$on('event:getModule2Data',function (event) {
    	//TODO: to get the model2 data
         $scope.pagename = "pages/test2.html";
     });
     $scope.$on('event:getModule3Data',function (event) {
    	//TODO: to get the model3 data
         $scope.pagename = "pages/test3.html";
     });
     $scope.$on('event:getModule4Data',function (event) {
    	//TODO: to get the model4 data
         $scope.pagename = "pages/test4.html";
     });
});

rootApp.controller('test1SelectController', function ($scope, $location, $anchorScroll) {
	
});
rootApp.controller('test2SelectController', function ($scope, $location, $anchorScroll) {
	
});
rootApp.controller('test3SelectController', function ($scope, $location, $anchorScroll) {
	
});
rootApp.controller('test4SelectController', function ($scope, $location, $anchorScroll) {
	
});


