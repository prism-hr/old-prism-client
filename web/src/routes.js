module.exports = routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/404');

    $stateProvider
        .state('404', {
            url: '/404',
            templateUrl: 'app/404.html'
        })
        .state('register', {
            url: '/register?accessCode&action',
            template: '<register activity="activity" action="{{action}}" access-code="{{accessCode}}"></register>',
            controller: function($scope, $stateParams, activity){
                $scope.activity = activity;
                $scope.action = $stateParams.action;
                $scope.accessCode = $stateParams.accessCode;
            },
            resolve: {
                activity: function ($stateParams, activationService) {
                    return activationService.getActivity($stateParams.accessCode, $stateParams.action);
                }
            }
        })
        .state('login', {
            url: '/login',
            template: '<div><h1>login</h1></div>',
            params: {user: null},
            controller: function ($state, $stateParams) {
                var user = $stateParams;
                console.log(user);
            }
        })
        .state('welcome', {
            url: '/',
            template: '<welcome></welcome>'
        });
}
