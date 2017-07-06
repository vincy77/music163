var app = angular.module('app',[
    'ui.router',
    'ui.bootstrap',
]);
//$rootScope添加有关路由的事件
app.run(['$rootScope', '$log', function($rootScope, $log){
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        $log.debug('successfully changed states') ;
        $rootScope.pageTitle = toState.data.pageTitle;
        // $log.debug('event', event);
        // $log.debug('toState', toState);
        // $log.debug('toParams', toParams);
        // $log.debug('fromState', fromState);
        // $log.debug('fromParams', fromParams);
    });

    $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){
        $log.error('The request state was not found: ' + unfoundState);
    });
    //
    // $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
    //     $log.error('An error occurred while changing states: ' + error);
    //
    //     $log.debug('event', event);
    //     $log.debug('toState', toState);
    //     $log.debug('toParams', toParams);
    //     $log.debug('fromState', fromState);
    //     $log.debug('fromParams', fromParams);
    // });
}]);

app.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'http://media.w3.org/**']);
});
//异步加载
app.config(function($controllerProvider,$compileProvider,$filterProvider,$provide){
    app.register = {
        //得到$controllerProvider的引用
        controller : $controllerProvider.register,
        //同样的，这里也可以保存directive／filter／service的引用
        directive: $compileProvider.directive,
        filter: $filterProvider.register,
        service: $provide.service
    };
});



function httpServ(req,servHttp){
    //servHttp.test('jkjkjkffffffffff');
    return req.then(function(res){
        //console.log(res);
        if(res.code){
            return res.result;
        }else{
            return false;
        }

    }).finally(function () {
        console.log('结束')
    });

}