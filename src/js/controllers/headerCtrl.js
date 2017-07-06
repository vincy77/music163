app.controller('headerCtrl', function ($rootScope, $scope, $state) {
    //变量
    $scope.v = {
        keyword: ''
    };
    $scope.f = {
        search: search
    };
    function search(event) {
        $scope.nav.current ={};
        if(event.keyCode == 13 && $scope.v.keyword){
            var url = $state.href('app.search', {keyword: $scope.v.keyword});
            //window.open(url, '_bland');
            $state.go('app.search',{ keyword: $scope.v.keyword});
        }
    }
    $scope.nav = {
        data: [{key: 0, value: '发现音乐', url: 'app.discover.music'}, {
                key: 1, value: '我的音乐', url: 'app.myMusic'}, {
                key: 2, value: '朋友', url: 'app.myMusic'}, {
                key: 3, value: '商城', url:'http://music.163.com/store/product'}, {
                key: 4, value: '音乐人', url: 'http://music.163.com/nmusician/web/index'}, {
                key: 5, value: '下载客户端', url: 'app.download'}
        ],
        current:  {},
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
            value: '推荐'
        },
        change: changeSubNav
    };
    function changeNav(index) {
        $scope.nav.current = $scope.nav.data[index];
        window.sessionStorage['nav'] = JSON.stringify($scope.nav.current);

        //$state.go($scope.nav.current.url);
    }
    function changeSubNav(index) {
        $scope.subNav.current = $scope.subNav.data[index];
        //$state.go($scope.subNav.current.url);

    }
    (function () {
        //console.log(JSON.parse(window.sessionStorage['nav']));
        if(window.sessionStorage['nav']){
            $scope.nav.current = JSON.parse(window.sessionStorage['nav']);
        }else{
            $scope.nav.current = {
                key: 0,
                value: '发现音乐',
                url: 'app.fundMusic'
            };
        }

    })();

});
