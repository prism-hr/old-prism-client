module.exports = routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider, createSteps) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/404');

    $stateProvider
        .state('404', {
            url: '/404',
            template: require('./app/404.html'),
            resolve: {
                $title: function () {
                    return '404';
                }
            }
        })
        .state('invited', {
            url: '/invited?accessCode&action',
            component: 'invited',
            resolve: {
                /** @ngInject */
                activity: function ($stateParams, ActivationService) {
                    return $stateParams.accessCode && ActivationService.getActivity($stateParams.accessCode, $stateParams.action);
                },
                $title: function () {
                    return 'Invited';
                }
            }
        })
        .state('employerWelcome', {
            url: '/employer/welcome',
            component: 'employerWelcome',
            data: {auth: true},
            params: {
                showRegistration: false
            },
            resolve: {
                $title: function () {
                    return 'Welcome Employer';
                }
            }
        })
        .state('employer', {
            url: '/employer/{id:new|\\d+}',
            abstract: true,
            component: 'employer',
            data: {auth: true},
            resolve: {
                employerManager: function ($stateParams, employerManagerFactory) {
                    return employerManagerFactory.getManager($stateParams.id);
                },
                organization: function (employerManager) {
                    return employerManager.getEmployer();
                },
                type: function () {
                    return 'EMPLOYER';
                },
                $title: function () {
                    return 'Create Employer';
                }
            }
        })
        .state('position', {
            url: '/position',
            component: 'position',
            data: {auth: true},
            resolve: {
                $title: function () {
                    return 'Create Position';
                }
            }
        })
        .state('university', {
            url: '/university',
            component: 'university',
            data: {auth: true},
            resolve: {
                $title: function () {
                    return 'University';
                }
            }
        })
        .state('universityOrganization', {
            url: '/university/organization',
            component: 'universityOrganization',
            data: {auth: true},
            resolve: {
                $title: function () {
                    return 'Create University';
                }
            }
        })
        .state('student', {
            url: '/student',
            component: 'student',
            data: {auth: true},
            resolve: {
                $title: function () {
                    return 'Student';
                }
            }
        })
        .state('welcome', {
            url: '/',
            component: 'welcome',
            resolve: {
                $title: function () {
                    return 'Welcome';
                }
            }
        })
        .state('activities', {
            url: '/activities',
            component: 'activities',
            data: {auth: true},
            resolve: {
                /** @ngInject */
                activities: function (Restangular) {
                    return Restangular.one('user', 'activities').get({state: 'PENDING'});
                },
                $title: function () {
                    return 'Activities';
                }
            }

        });

    _.each(createSteps.employer, function (step, index) {
        var data = angular.copy(step.data) || {};
        data.stepIdx = index;
        $stateProvider
            .state('employer.' + step.id, {
                url: '/' + step.id,
                component: step.component,
                data: data
            });
    });

    // function returnTo($transition$) {
    //     var redirectedFrom = $transition$.previous();
    //     // The user was redirected to the login state (via the requiresAuth hook)
    //     if (redirectedFrom !== null) {
    //         while (redirectedFrom.previous()) {
    //             redirectedFrom = redirectedFrom.previous();
    //         }
    //         return {state: redirectedFrom.to(), params: redirectedFrom.params('to')};
    //     }
    //
    //     // The user was not redirected to the login state; they directly activated the login state somehow.
    //     // Return them to the state they came from.
    //     var fromState = $transition$.from();
    //     var fromParams = $transition$.params('from');
    //
    //     if (fromState.name !== '') {
    //         return {state: fromState, params: fromParams};
    //     }
    //
    //     return {state: 'welcome'};
    // }
}
