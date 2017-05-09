app.config(
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .otherwise('/app');
        $stateProvider
            .state('app',{
                url: '/app',
                templateUrl: './src/app.html'
            })
            //搜索音乐
            .state('app.search', {
                url: '/search?keyword',
                templateUrl: 'src/html/search.html'
            })
            //发现音乐
            .state('app.discover', {
                url: '/discover',
                templateUrl: 'src/html/discover.html'
            })
            //发现音乐二级目录
            .state('app.discover.music', {
                url: '/music',
                templateUrl: 'src/html/discoverMusic.html'
            })
            .state('app.discover.toplist', {
                url: '/toplist',
                templateUrl: 'src/html/discoverToplist.html'
            })
            .state('app.discover.playlist', {
                url: '/playlist?type',
                templateUrl: 'src/html/discoverPlaylist.html'
            })
            .state('app.discover.djradio', {
                url: '/djradio',
                templateUrl: 'src/html/discoverDJradio.html'
            })
            .state('app.discover.artlist', {
                url: '/artlist',
                templateUrl: 'src/html/discoverArtlist.html'
            })
            .state('app.discover.album', {
                url: '/album',
                templateUrl: 'src/html/discoverAlbum.html'
            })
            //我的音乐
            .state('app.myMusic', {
                url: '/myMusic',
                templateUrl: 'src/html/myMusic.html'
            })
            //下载客户端
            .state('app.download', {
                url: '/src/html/download',
                templateUrl: 'src/html/download.html'
            })
            .state('app.demo', {
                url: '/demo',
                templateUrl: 'src/html/demo.html'
            });
    }
);