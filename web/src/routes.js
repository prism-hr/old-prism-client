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
        .state('invited', {
            url: '/invited?accessCode&action',
            template: '<invited activity="activity"></invited>',
            controller: function ($scope, $stateParams, activity) {
                $scope.activity = activity.plain();
            },
            resolve: {
                activity: function ($stateParams, ActivationService) {
                    return $stateParams.accessCode && ActivationService.getActivity($stateParams.accessCode, $stateParams.action);
                }
            }
        })
        .state('employer', {
            url: '/employer',
            template: '<employer></employer>',
            data: {hideSidebar: true},
        })
        .state('employer-step1', {
            url: '/employer/step1',
            template: '<employer-step1 activity="activity" action="{{action}}" access-code="{{accessCode}}"></employer-step1>',
            data: {hideSidebar: true},
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
                    return Restangular.one('user', 'activities').get({state: 'PENDING'});
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
