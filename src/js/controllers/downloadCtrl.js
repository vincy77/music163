app.controller('downloadCtrl', function ($scope) {

    $scope.v = {
        carousel: {
            myInterval: 5000,
            noWrapSlides: false,
            active: 0,
            slides: [],
        },
    };

    var slides = $scope.v.carousel.slides;
    var currIndex = 0;
    function addSlide() {
        var newWidth = 600 + slides.length + 1;
        slides.push({
            image: '//unsplash.it/' + newWidth + '/300',
            text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
            id: currIndex++
        });
    }
    for (var i = 0; i < 4; i++) {
        addSlide();
    }
});