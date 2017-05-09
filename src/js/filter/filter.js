app.filter('count', function() {

    return function(input) {
        //console.log(input);
        var num = input;
        if(input > 999999){
            num = parseInt(input / 10000) + '万';
            console.log(num);
        }

        return num;
    };
});