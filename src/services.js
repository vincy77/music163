// 通用的Http
app.service('servHttp', function($http) {
    return {
        get: (url, data) => {
            console.log(data);
            return $http.get(url, {
                params: data,
                cache: false
            }).then(function (res) {
                console.log('get');
                //console.log(res);
                return res.data;
            })
                .catch(function (res) {
                    console.log(res);
                    console.log('shibai');
                    return false;
                });
        },
        post: (url, data) => {
            return $http({
                method:'post',
                url:url,
                data:data,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
            }).then(res => res.data)
            .catch(res => res.data);
            // return $http.post(url, data)
            //     .then(function (res) {
            //         console.log('post');
            //         console.log(res);
            //         return res.data;
            //     })
            //     .catch(function (res) {
            //         console.log(res);
            //         console.log('shibai');
            //         return false;
            //     });
                // .then(res => res.data)
                // .catch(res => res.data);
        },
        jsonp: (url, data) => {
            return $http.jsonp(url + '&callback=JSON_CALLBACK', {
                params: data,
                cache: false
            })
                .then(function (res) {
                    return res;
                })
                .catch(function (res) {
                    console.log(res);
                    console.log('shibai');
                        return false;
                });
                // .success(res => {
                //     console.log(res);
                //     console.log('success');
                //     return res.data;
                //
                //     //res.data;
                //
                // }).error(res => {
                //     console.log('error')
                // })
        },
        test: function (data) {
            console.log(data)
        }
    };
});