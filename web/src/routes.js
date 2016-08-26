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
            /** @ngInject */
            controller: function ($scope, $stateParams, activity) {
                $scope.activity = activity.plain();
            },
            resolve: {
                /** @ngInject */
                activity: function ($stateParams, ActivationService) {
                    return $stateParams.accessCode && ActivationService.getActivity($stateParams.accessCode, $stateParams.action);
                }
            }
        })
        .state('employer', {
            url: '/employer',
            template: '<employer></employer>'
        })
        .state('employerOrganization', {
            url: '/employer/organization',
            template: '<employer-organization></employer-organization>'
        })
        .state('university', {
            url: '/university',
            template: '<university></university>'
        })
        .state('universityOrganization', {
            url: '/university/organization',
            template: '<university-organization></university-organization>'
        })
        .state('student', {
            url: '/student',
            template: '<student></student>'
        })
        .state('welcome', {
            url: '/',
            template: '<welcome></welcome>'
        })
        .state('activities', {
            url: '/activities',
            template: '<activities activities="activities"></activities>',
            data: {auth: true},
            resolve: {
                /** @ngInject */
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
