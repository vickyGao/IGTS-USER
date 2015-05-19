rootApp.controller('rootController', function ($scope) {
    $scope.$on('event:ShowCreateCoverModalRequest', function (event, commodityId) {
        $scope.$broadcast('event:ShowCreateCoverModal', commodityId);
    });
});

rootApp.controller('headerController', function ($scope, UserService, AuthorizationService) {
    UserService.getByToken().success(function (data) {
        $scope.user = data.user;
    });
    $scope.tologin = function () {
        window.location.href = 'login.html';
    };
    $scope.doLogout = function () {
        AuthorizationService.logout();
        window.location.href = 'index.html';
    };
});

rootApp.controller('publishController', function ($scope, $cookieStore, Upload, CommodityService) {
    $scope.doSubmit = function () {
        var postBody = {
            commodity: $scope.commodity
        }
        CommodityService.create(postBody).success(function (data) {
            $scope.$emit('event:ShowCreateCoverModalRequest', data.commodity.id);
        });
    }
    $scope.progressPercent = 0;
    $scope.uploadStatusStyle = 'info';
    $scope.uploadStatus = "等待上传";

    $scope.upload = function (files) {
        if (files && files.length) {
            $scope.uploadStatusStyle = 'info';
            $scope.uploadStatus = "上传中";
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: 'user/api/image/upload',
                    headers:{'x-auth-token': $cookieStore.get('x-auth-token')},
                    file: file
                }).progress(function (evt) {
                    $scope.progressPercent = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function (data, status, headers, config) {
                    $scope.progressPercent = 100;
                    $scope.uploadStatusStyle = 'success';
                    $scope.uploadStatus = "上传完毕";
                }).error(function (data, status) {
                    if (status === 401) {
                        window.location.href = 'login.html';
                    } else if (status === 412) {
                        showDialog('Warning', data);
                    } else if (status >= 400 && status <= 500) {
                        showDialog('Error', data);
                    }
                    $scope.uploadStatusStyle = 'danger';
                    $scope.uploadStatus = "上传失败";
                });
            }
        }
    };
});

rootApp.controller('CreateCoverModalController', function ($scope, ImageService, CoverService) {
    var publishingCommodityId = '';
    $scope.$on('event:ShowCreateCoverModal', function (event, commodityId) {
        publishingCommodityId = commodityId;
        ImageService.getAll().success(function (data) {
            $scope.images = data.images;
        });
        $('#createCoverModal').modal("show");
     
    });
    var selectedImagelist = [];
    $scope.doSelectCover = function (image) {
        selectedImagelist.push(image);
        $scope.selectedImages = selectedImagelist.concat();
    }
    $scope.doDeSelectCover = function (image) {
        var tempSelectedImagelist = [];
        angular.forEach(selectedImagelist, function(selectedImage,index,array){
            if (selectedImage.id != image.id) {
                tempSelectedImagelist.push(selectedImage);
            }
        });
        selectedImagelist = tempSelectedImagelist.concat();
        $scope.selectedImages = selectedImagelist;
    }
    $scope.doSubmit = function (selectedImages) {
        var postBody = {
            images:selectedImages
        }
        CoverService.create(publishingCommodityId, postBody);
        $('#createCoverModal').modal("hide");
    }
});