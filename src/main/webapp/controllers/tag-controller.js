rootApp.controller('TagListController', function ($scope, $location, TagService) {
    TagService.listDetail().success(function (data) {
        $scope.tags = data.tags;
    });

    $scope.$on('event:flushList', function () {
        TagService.listDetail().success(function (data) {
            $scope.tags = data.tags;
        });
    });

    $scope.searchByTag = function(tagId){
         var uri = {tag : tagId, sortby : 'RELEASE_DATE', orderby : 'DESC'}
         $location.path('/search').search(uri);
    }
});