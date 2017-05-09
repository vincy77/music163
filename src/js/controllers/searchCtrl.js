app.controller('searchCtrl', function ($scope, $state, $stateParams, servHttp) {
    //
    $scope.v = {
        keyword: $stateParams.keyword,
        type: 1,
        songlist: [],
        over: '',
        responseData: null
    };
    //
    $scope.f = {
        enterSearch: enterSearch,
        search: search
    };
    //
    $scope.pagination = {
        totalItems: null,
        pageSize: 20,
        currentPage: 1,
        maxSize: 7
    };
    //
    $scope.tab = {
        data: [{key: 1, value: '单曲', desc: '首单曲'},
            {key: 100, value: '歌手', desc: '个歌手'},
            {key: 10, value: '专辑', desc: '张专辑'},
            {key: 1004, value: 'MV', desc: '首MV'},
            {key: 1006, value: '歌词', desc: '个歌词'},
            {key: 1000, value: '歌单', desc: '个歌单'},
            {key: 1009, value: '主播电台', desc: '个节目'},
            {key: 1002, value: '用户', desc: '个用户'}],
        current: {key: 1, value: '单曲', desc: '首单曲'},
        change: tabChange
    };
    //接口
    $scope.api = {
        'search': function (data) {
            return servHttp.post('/api/search/get/web', data);
        }
    };
    //enterSearch
    function enterSearch(event) {
        if(event.keyCode == 13 && $scope.v.keyword){
            $scope.v.search();
        }
    }
    //
    function search() {
        if($scope.v.keyword){
            getList();
        }
    }
    //
    function tabChange(index) {
        if($scope.tab.data[index].type !== $scope.tab.current.key){
            $scope.tab.current = $scope.tab.data[index];
            getList();
        }

    }
    function getList() {
        var data = {
            'limit': $scope.pagination.pageSize,
            'offset': $scope.pagination.currentPage -1,
            's': $scope.v.keyword,
            'type': $scope.tab.current.key
        };
        //10.9.50.67
        httpServ($scope.api.search(data), servHttp).then(function (res) {
            console.log(res);
            if(res){
                $scope.v.responseData = res;
                $scope.pagination.totalItems = res.songCount || res.artistCount || res.albumsCount || res.playlistCount || res.djprogramCount || res.userprofileCount;
                $scope.v.songlist = res.songs || res.artists || res.albums || res.playlists || res.djprograms || res.userprofiles;

            }
        });
    }
    (function(){
        getList();
    })();
    $scope.$watch('pagination.currentPage', function(newVal, oldVal) {
        if (newVal !== oldVal) {
            getList();
        }
    }, true);

});