module.exports = routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/404');

    $stateProvider
        .state('404', {
            url: '/404',
            template: require('./app/404.html')
        })
        .state('invited', {
            url: '/invited?accessCode&action',
            component: 'invited',
            resolve: {
                /** @ngInject */
                activity: function ($stateParams, ActivationService) {
                    return $stateParams.accessCode && ActivationService.getActivity($stateParams.accessCode, $stateParams.action);
                }
            }
        })
        .state('employer', {
            url: '/employer',
            component: 'employer'
        })
        .state('employerOrganization', {
            url: '/employer/organization',
            component: 'employer-organization'
        })
        .state('university', {
            url: '/university',
            component: 'university'
        })
        .state('universityOrganization', {
            url: '/university/organization',
            component: 'university-organization'
        })
        .state('student', {
            url: '/student',
            component: 'student'
        })
        .state('welcome', {
            url: '/',
            component: 'welcome'
        })
        .state('activities', {
            url: '/activities',
            component: 'activities',
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
        if (redirectedFrom !== null) {
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
