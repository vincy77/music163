app.config(
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .otherwise('/app/discover/music');
        $stateProvider
            .state('app',{
                url: '/app',
                templateUrl: './src/app.html'
            })
            //搜索音乐
            .state('app.search', {
                url: '/search?keyword',
                templateUrl: 'src/html/search.html',
                data: { pageTitle: '搜索音乐'}
            })
            //发现音乐
            .state('app.discover', {
                url: '/discover',
                templateUrl: 'src/html/discover.html',
                data: { pageTitle: '发现音乐'},
                resolve: {
                    loadCtrl: ["$q", function($q) {
                        var deferred = $q.defer();
                        //异步加载controller／directive/filter/service
                        require([
                            'controllers/discoverMusicCtrl'
                        ], function() { deferred.resolve(); });
                        return deferred.promise;
                    }]
                }
            })
            //发现音乐二级目录
            .state('app.discover.music', {
                url: '/music',
                templateUrl: 'src/html/discoverMusic.html',
                data: { pageTitle: '网易云音乐'}
            })
            .state('app.discover.toplist', {
                url: '/toplist',
                templateUrl: 'src/html/discoverToplist.html',
                data: { pageTitle: '发现音乐 - 排行榜'}
            })
            .state('app.discover.playlist', {
                url: '/playlist?type',
                templateUrl: 'src/html/discoverPlaylist.html',
                data: { pageTitle: '发现音乐 - 歌单'}
            })
            .state('app.discover.djradio', {
                url: '/djradio',
                templateUrl: 'src/html/discoverDJradio.html',
                data: { pageTitle: '发现音乐 - 主播电台'}
            })
            .state('app.discover.artlist', {
                url: '/artlist',
                templateUrl: 'src/html/discoverArtlist.html',
                data: { pageTitle: '发现音乐 - 歌手'}
            })
            .state('app.discover.album', {
                url: '/album',
                templateUrl: 'src/html/discoverAlbum.html',
                data: { pageTitle: '发现音乐 - 新碟上架'}
            })
            //我的音乐
            .state('app.myMusic', {
                url: '/myMusic',
                templateUrl: 'src/html/myMusic.html',
                data: {pageTitle: '我的音乐'}
            })
            //我的音乐
            .state('app.friend', {
                url: '/friend',
                templateUrl: 'src/html/friend.html',
                data: {pageTitle: '朋友'}
            })
            //下载客户端
            .state('app.download', {
                url: '/src/html/download',
                templateUrl: 'src/html/download.html',
                data: {pageTitle: '下载客户端'}
            })
            .state('app.demo', {
                url: '/demo',
                templateUrl: 'src/html/demo.html'
            });
    }
);