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
            controller: function ($scope, $stateParams, activity) {
                $scope.activity = activity && activity.plain();
                $scope.action = $stateParams.action;
                $scope.accessCode = $stateParams.accessCode;
            },
            data: {hideHeaderFooter: true},
            resolve: {
                activity: function ($stateParams, activationService) {
                    return $stateParams.accessCode && activationService.getActivity($stateParams.accessCode, $stateParams.action);
                }
            }
        })
        .state('login', {
            url: '/login',
            template: '<login activity="activity" action="{{action}}" access-code="{{accessCode}}"></login>',
            controller: function ($scope, $stateParams, activity) {
                $scope.activity = activity && activity.plain();
                $scope.action = $stateParams.action;
                $scope.accessCode = $stateParams.accessCode;
            },
            data: {hideHeaderFooter: true},
            resolve: {
                activity: function ($stateParams, activationService) {
                    return $stateParams.accessCode && activationService.getActivity($stateParams.accessCode, $stateParams.action);
                }
            }
        })
        .state('welcome', {
            url: '/',
            template: '<welcome></welcome>'
        })
        .state('activities', {
            url: '/activities',
            template: '<activities activities="activities"></activities>',
            resolve: {
                activities: function (Restangular) {
                    return Restangular.one('user', 'activities').get();
                }
            }

        });
}
