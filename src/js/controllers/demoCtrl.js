app.controller('ctrlDemo', function($scope){
    //页面相关数据
    $scope.form = {
        city:'北京'
    };
    $scope.data = {};

    //函数
    $scope.f = {
        'searchW':searchW
    };

    function searchW() {
        console.log('demo.k.l.........');
        // var data ={
        //     location: $scope.form.city,
        //     output: 'json',
        //     ak: 'WctKqdbigbIPwXb8kLfGDyhRVs9XDqnD'
        // };
        // serPublishAPI.searchW(data).then(function() {
        //     if(res.data.error === 0){
        //         $scope.data = res.data.results[0];
        //         console.log($scope.data);
        //     }else{
        //         alertDemo.alertError(res.data.status);
        //     }
        // });

    }
});