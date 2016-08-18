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
            data: {hideHeaderFooter: true, hideSidebar: true},
            resolve: {
                activity: function ($stateParams, ActivationService) {
                    return $stateParams.accessCode && ActivationService.getActivity($stateParams.accessCode, $stateParams.action);
                }
            }
        })
        .state('login', {
            url: '/login',
            template: '<login activity="activity" action="{{action}}" returnTo="returnTo"></login>',
            controller: function ($scope, $stateParams, activity) {
                $scope.activity = activity && activity.plain();
                $scope.action = $stateParams.action;
                $scope.accessCode = $stateParams.accessCode;
            },
            data: {hideHeaderFooter: true, hideSidebar: true},
            resolve: {
                activity: function ($stateParams, ActivationService) {
                    return $stateParams.accessCode && ActivationService.getActivity($stateParams.accessCode, $stateParams.action);
                },
                returnTo: returnTo
            }
        })
        .state('welcome', {
            url: '/',
            template: '<welcome></welcome>',
            data: {hideSidebar: true}
        })
        .state('activities', {
            url: '/activities',
            template: '<activities activities="activities"></activities>',
            data: {auth: true},
            resolve: {
                activities: function (Restangular) {
                    return Restangular.one('user', 'activities').get();
                }
            }

        });

    function returnTo($transition$) {
        var redirectedFrom = $transition$.previous();
        // The user was redirected to the login state (via the requiresAuth hook)
        if (redirectedFrom != null) {
            while (redirectedFrom.previous()) {
                redirectedFrom = redirectedFrom.previous();
            }
            return {state: redirectedFrom.to(), params: redirectedFrom.params("to")};
        }

        // The user was not redirected to the login state; they directly activated the login state somehow.
        // Return them to the state they came from.
        var fromState = $transition$.from();
        var fromParams = $transition$.params("from");

        if (fromState.name !== '') {
            return {state: fromState, params: fromParams};
        }

        return {state: 'welcome'};
    }
}
