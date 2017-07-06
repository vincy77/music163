app.controller('downloadCtrl', function ($scope) {

    $scope.v = {
        carousel: {
            myInterval: 5000,
            noWrapSlides: false,
            active: 0,
            slides: [{id:0, image: './src/static/images/banner-pc.png'},
                {id:1, image: './src/static/images/banner-ios.png'},
                {id: 2, image: './src/static/images/banner-aos.png'}],
        },
    };
});