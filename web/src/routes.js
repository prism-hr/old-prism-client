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
                $title: _.wrap('404')
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
                $title: _.wrap('Invited')
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
                $title: _.wrap('Welcome Employer')
            }
        })
        .state('employer', {
            url: '/employer/{id:new|\\d+}',
            abstract: true,
            component: 'organization',
            data: {auth: true},
            resolve: {
                type: _.wrap('EMPLOYER'),
                resourceManager: function ($stateParams, resourceManagerFactory, type) {
                    return resourceManagerFactory.getManager($stateParams.id, type);
                },
                organization: function (resourceManager) {
                    return resourceManager.getResource();
                },
                $title: _.wrap('Company Information')
            }
        })
        .state('employer-view', {
            url: '/employer-view',
            component: 'employerView',
            data: {auth: true},
            resolve: {
                $title: _.wrap('Employer View Demo')
            }
        })
        .state('position-view', {
            url: '/position-view',
            component: 'positionView',
            data: {auth: true},
            resolve: {
                $title: _.wrap('Graduate Software and Electronics Engineers')
            }
        })
        .state('position', {
            url: '/position',
            component: 'position',
            data: {auth: true},
            resolve: {
                $title: _.wrap('Create Position')
            }
        })
        .state('universityWelcome', {
            url: '/universityWelcome',
            component: 'universityWelcome',
            data: {auth: true},
            resolve: {
                $title: _.wrap('Welcome University')
            }
        })
        .state('universityOrganization', {
            url: '/university/organization',
            component: 'universityOrganization',
            data: {auth: true},
            resolve: {
                $title: _.wrap('Create University')
            }
        })
        .state('student', {
            url: '/student',
            component: 'student',
            data: {auth: true},
            resolve: {
                $title: _.wrap('Student')
            }
        })
        .state('welcome', {
            url: '/',
            component: 'welcome',
            resolve: {
                $title: _.wrap('Welcome')
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
                $title: _.wrap('Activities')
            }

        });

    _.each(createSteps.employer, function (step, index) {
        var data = angular.copy(step.data) || {};
        data.stepIdx = index;
        var component = _.kebabCase(step.component);
        $stateProvider
            .state('employer.' + step.id, {
                url: '/' + step.id,
                template: '<' + component + ' type="{{type}}" form="organizationForm" organization="organization"></' + component + '>',
                data: data,
                resolve: {
                    $title: function (organization) {
                        var prefix = organization.id ? '' : 'Step ' + (index + 1) + ': ';
                        return prefix + step.title;
                    }
                },
                controller: function ($scope, type, organization) {
                    $scope.type = type;
                    $scope.organization = organization;
                }
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
