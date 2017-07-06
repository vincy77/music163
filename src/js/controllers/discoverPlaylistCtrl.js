app.controller('discoverPlaylistCtrl', function ($scope, $stateParams) {
    $scope.v = {
        type: $stateParams.type,
        cateBox: false
    };
    $scope.f = {
        'chooseCate': chooseCate
    };

    function chooseCate() {
        $scope.v.cateBox = !$scope.v.cateBox;
    }
});