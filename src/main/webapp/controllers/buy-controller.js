rootApp.controller('BuyManagementController', function ($scope, $location, $routeParams) {
    $scope.$on('event:showTotalAmountRequest', function (event, price, carriage) {
        $scope.$broadcast('event:showTotalAmount', price, carriage);
    });
});

rootApp.controller('BuyCommdodityInfoController', function ($scope, $routeParams, CommodityService) {
    var commodityId = $routeParams.commodityId;
    $scope.commodityId = commodityId;
    CommodityService.getDetail(commodityId).success(function (data) {
        $scope.imageSrc = data.commodity.covers[0].image.uri;
        $scope.commodity = data.commodity;
        $scope.$emit('event:showTotalAmountRequest', data.commodity.price, data.commodity.carriage);
    });
});

rootApp.controller('BuyCommdodityFormController', function ($scope, $routeParams, $location, AddressService, IndentService) {
    var commodityId = $routeParams.commodityId;
    $scope.indent = {
    		'commodityid':commodityId
    };
    AddressService.getListForUser().success(function (data) {
        var addressResultList = new Array();
        angular.forEach(data.addresses, function (address, index) {
            if(index == (data.addresses.length - 1)){
                address.selectedAddress = true;
            }else{
                address.selectedAddress = false;
            }
            addressResultList.push(address);
        });
        $scope.addressList = addressResultList;
    });
    $scope.selectAddress = function(index){
        angular.forEach($scope.addressList, function (address) {
            address.selectedAddress = false;
           });
        $scope.addressList[index].selectedAddress = true;
        return;
    };
    $scope.addNewAddress = function(){
        angular.forEach($scope.addressList, function (address) {
            address.selectedAddress = false;
          });
        $('#AddAddressModal').modal('show');
    };

    $scope.saveIndent = function(){
    	var haveAddress = false;
        angular.forEach($scope.addressList, function (address) {
            if(address.selectedAddress){
            	haveAddress = true;
                $scope.indent.phonenumber = address.phonenumber;
                $scope.indent.indentaddress = address.addressprovince + address.addresscity + " " + address.addressdetail;
            }
        });
        if(!haveAddress){
        	alert("请选择或者添加收货地址！");
        }else{
            var request = {
                    "indent": $scope.indent
                };
	        IndentService.create(commodityId, request).success(function (data) {
	            var tomodule = "indentlist";
	            $location.path("/ownerinfo/" + tomodule).replace();
	         });
        }
    };

    $scope.$on('event:showAddressListRequest', function (event) {
        AddressService.getListForUser().success(function (data) {
            var addressResultList = new Array();
            angular.forEach(data.addresses, function (address, index) {
                if(index == (data.addresses.length - 1)){
                    address.selectedAddress = true;
                }else{
                    address.selectedAddress = false;
                }
                addressResultList.push(address);
            });
            $scope.addressList = addressResultList;
            $('#AddAddressModal').modal('hide');
        });
     });
    
    $scope.$on('event:showTotalAmount', function (event, price, carriage) {
            $scope.total  = price + carriage;
    });
});

