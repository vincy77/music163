var app = angular.module('app',[
    'ui.router',
    'ui.bootstrap',
]);
app.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'http://media.w3.org/**']);
});



function httpServ(req,servHttp){
    //servHttp.test('jkjkjkffffffffff');
    return req.then(function(res){
        console.log(res);
        if(res.code){
            return res.result;
        }else{
            return false;
        }

    }).finally(function () {
        console.log('结束')
    });

}