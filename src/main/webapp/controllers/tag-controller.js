rootApp.controller('TagListController', function ($scope, TagService) {
    TagService.listDetail().success(function (data) {
        $scope.tags = data.tags;
    });
    $scope.$on('event:flushList', function () {
        TagService.listDetail().success(function (data) {
            $scope.tags = data.tags;
        });
    });
});