rootApp.controller('OwnerPictureLibraryManagementController', function ($scope, $cookieStore, Upload, ImageService) {
    $scope.progressPercent = 0;
    $scope.uploadStatusStyle = 'info';
    $scope.uploadStatus = "等待上传";

    ImageService.getAll().success(function (data) {
        $scope.imageList = data.images;
    });

    $scope.$on('event:flushImageList', function () {
        ImageService.getAll().success(function (data) {
            $scope.imageList = data.images;
        });
    });
    $scope.doDelete = function (imageId) {
        showConfirmDialog("确认删除？<br/> 删除之后使用该图片的商品将使用默认图标！", {
            ok: function (dialog) {
                dialog.title("提交中...");
                ImageService.delete(imageId).success(function () {
                    $scope.$emit('event:flushImageList');
                });
                return true;
            },
            cancel: function () {
                return false;
            }
        });
    }
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
                    $scope.$emit('event:flushImageList');
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

