app.controller('headerCtrl', function ($scope, $state) {
    //变量
    $scope.v = {
        keyword: ''
    };
    $scope.f = {
        search: search
    };
    function search(event) {
        if(event.keyCode == 13 && $scope.v.keyword){
            var url = $state.href('app.search', {keyword: $scope.v.keyword});
            window.open(url, '_bland');
        }

    }
    $scope.nav = {
        data: [{key: 0, value: '发现音乐', url: 'app.discover.music'}, {
                key: 1, value: '我的音乐', url: 'app.myMusic'}, {
                key: 2, value: '朋友', url: ''}, {
                key: 3, value: '商城', url:''}, {
                key: 4, value: '音乐人', url: ''}, {
                key: 5, value: '下载客户端', url: 'app.download'}
        ],
        current:  {
            key: 0,
            value: '发现音乐',
            url: 'app.fundMusic'
        },
        change: changeNav
    };
    $scope.subNav = {
        data: [{key: 0, value: '推荐', url: 'app.discover.music'}, {
            key: 1, value: '排行榜', url: 'app.discover.toplist'}, {
            key: 2, value: '歌单', url: 'app.discover.playlist'}, {
            key: 3, value: '主播电台', url: 'app.discover.djradio'}, {
            key: 4, value: '歌手', url: 'app.discover.artlist'}, {
            key: 5, value: '新碟上架', url: 'app.discover.album'}
        ],
        current:  {
            key: 0,
            value: '发现音乐'
        },
        change: changeSubNav
    };
    function changeNav(index) {
        $scope.nav.current = $scope.nav.data[index];
        console.log($scope.nav.current);

        $state.go($scope.nav.current.url);
    }
    function changeSubNav(index) {

        $scope.subNav.current = $scope.subNav.data[index];
        $state.go($scope.subNav.current.url);

    }


});
