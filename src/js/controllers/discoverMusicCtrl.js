app.controller('discoverMusicCtrl', function ($scope, servHttp) {
    //变量
    $scope.v = {
        over: '',
        carousel: {
            myInterval: 5000,
            noWrapSlides: false,
            active: 0,
            slides: [],
        },
        hot: [{key: 0, value: '华语'},{
            key: 1, value: '流行'}, {
            key: 2, value: '摇滚'}, {
            key: 3, value: '民谣'}, {
            key: 4, value: '电子'}],
        playlist: [],
        recommend: [{id: 0, img: './src/static/images/music.png', title: '', desc: ''},
            {id: 1, img: './src/static/images/music.png', title: '', desc: ''},
            {id: 2, img: './src/static/images/music.png', title: '', desc: ''}],
        test: [{id: 0, data: [
            {id: 0, name:'111', art: '222', img: './src/static/images/music.png'},
            {id: 1, name:'aaa', art: 'sss', img: './src/static/images/music.png'},
            {id: 2, name:'111', art: '222', img: './src/static/images/music.png'},
            {id: 3, name:'111', art: '222', img: './src/static/images/music.png'},
            {id: 4, name:'111', art: '222', img: './src/static/images/music.png'}
            ]},
            {id: 1, data: [
                {id: 0, name:'qqq', art: 'www', img: './src/static/images/music.png'},
                {id: 1, name:'eee', art: 'rrrr', img: './src/static/images/music.png'},
                {id: 2, name:'ttt', art: 'yyy', img: './src/static/images/music.png'},
                {id: 3, name:'uuu', art: 'iii', img: './src/static/images/music.png'},
                {id: 4, name:'ooo', art: 'ppp', img: './src/static/images/music.png'}
                ]}],
        enterSinger: [{id: 0, singer: '', desc: '', img: './src/static/images/music.png'},
            {id: 1, singer: '', desc: '', img: './src/static/images/music.png'},
            {id: 2, singer: '', desc: '', img: './src/static/images/music.png'},
            {id: 3, singer: '', desc: '', img: './src/static/images/music.png'},
            {id: 4, singer: '', desc: '', img: './src/static/images/music.png'}],
        billList: [
            {title: '云音乐飙升榜', img: './src/static/images/biaosheng.png', list: []},
            {title: '云音乐新歌榜', img: './src/static/images/xinge.png', list: []},
            {title: '网易原创歌曲榜', img: './src/static/images/yuanchuang.png', list: []}
        ]
    };

    //函数
    $scope.f = {
        test: test
    };
    $scope.api = {
        //推荐DJ
        'djprogram': function(data) {
            return servHttp.get(`/api/personalized/djprogram`, data);
        },
        //
        'music': function (data) {
            return servHttp.get('/api/playlist/detail', data);
        },
        //
        'search': function (data) {
            return servHttp.post('/api/search/pc', data);
        },
        //推荐歌单
        'playlist': function (data) {
            return servHttp.get(`/api/personalized/playlist`, data);
        },
        //新歌推荐
        'newsong': function (data) {
            return servHttp.get(`/api/personalized/newsong`, data);
        }
    };
    var slides = $scope.v.carousel.slides;
    var currIndex = 0;

    function test() {
        // var data = {
        //     id: 37880978,
        //     updateTime: -1
        //     };
        // httpServ($scope.api.music(data), servHttp).then(function (res) {
        //     console.log('klklk');
        // });
        var data = {
            'limit': 20,
            'offset': 0,
            's': 'ftisland',
            'type': 1
        };
        console.log(data);
        httpServ($scope.api.search(data), servHttp).then(function (res) {
            console.log(res);
        });
    }

    function addSlide() {
        var newWidth = 600 + slides.length + 1;
        slides.push({
            image: '//unsplash.it/' + newWidth + '/300',
            text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
            id: currIndex++
        });
    }



    (function () {
        for (var i = 0; i < 4; i++) {
            addSlide();
        }
        //新歌榜
        var newsong = {
            type: 'recommend'
        };
        httpServ($scope.api.newsong(newsong), servHttp).then(function (res) {
            if(res){
                $scope.v.billList[0].list = res;
                $scope.v.billList[1].list = res;
                $scope.v.billList[2].list = res;
            }
        });
        //推荐歌单
        httpServ($scope.api.playlist(), servHttp).then(function (res) {
            if(res){
                $scope.v.playlist = res;
            }
        });
        //推荐dj
        httpServ($scope.api.djprogram(), servHttp).then(function (res) {
            if(res){
                $scope.v.enterSinger = res;
            }
        });
    })();

});