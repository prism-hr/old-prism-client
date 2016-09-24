module.exports = routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider, resourceCreateWizardFactoryProvider) {
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
        .state('promoterWelcome', {
            url: '/promoter/welcome',
            component: 'promoterWelcome',
            data: {auth: true},
            params: {
                showRegistration: false
            },
            resolve: {
                $title: _.wrap('Welcome Advertiser')
            }
        })
        .state('promoter', {
            url: '/promoter/{id:new|\\d+}',
            abstract: true,
            component: 'organization',
            data: {auth: true},
            resolve: {
                type: _.wrap('PROMOTER'),
                wizard: function ($stateParams, resourceManagerFactory, resourceCreateWizardFactory, type) {
                    return resourceManagerFactory.getManager($stateParams.id, type)
                        .then(function (resourceManager) {
                            return resourceCreateWizardFactory.getWizard(resourceManager, type);
                        });
                },
                $title: _.wrap('Company Information')
            }
        })
        .state('departmentWelcome', {
            url: '/department/welcome',
            component: 'departmentWelcome',
            data: {auth: true},
            resolve: {
                $title: _.wrap('Welcome University')
            }
        })
        .state('department', {
            url: '/department/{id:new|\\d+}',
            abstract: true,
            component: 'organization',
            data: {auth: true},
            resolve: {
                type: _.wrap('DEPARTMENT'),
                wizard: function ($stateParams, resourceManagerFactory, resourceCreateWizardFactory, type) {
                    return resourceManagerFactory.getManager($stateParams.id, type)
                        .then(function (resourceManager) {
                            return resourceCreateWizardFactory.getWizard(resourceManager, type);
                        });
                },
                $title: _.wrap('University Information')
            }
        })
        .state('position', {
            url: '/position/{id:new|\\d+}',
            abstract: true,
            component: 'position',
            data: {auth: true},
            resolve: {
                type: _.wrap('POSITION'),
                wizard: function ($stateParams, resourceManagerFactory, resourceCreateWizardFactory, type) {
                    return resourceManagerFactory.getManager($stateParams.id, type)
                        .then(function (resourceManager) {
                            return resourceCreateWizardFactory.getWizard(resourceManager, type);
                        });
                },
                $title: _.wrap('Advert')
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

    _.each(['PROMOTER', 'DEPARTMENT', 'POSITION'], function (resourceType) {
        _.each(resourceCreateWizardFactoryProvider.getStepDefinitions(resourceType), function (step, index) {
            var data = angular.copy(step.data) || {};
            data.stepIdx = index;
            var component = _.kebabCase(step.component);
            var template;
            if (resourceType === 'POSITION') {
                template = '<' + component + ' type="{{type}}" form="positionForm" position="resource" wizard="wizard"></' + component + '>';
            } else {
                template = '<' + component + ' type="{{type}}" form="organizationForm" organization="resource" wizard="wizard"></' + component + '>';
            }
            $stateProvider
                .state(resourceType.toLowerCase() + '.' + step.id, {
                    url: '/' + step.id,
                    template: template,
                    data: data,
                    resolve: {
                        resource: function (wizard) {
                            return wizard.getResource();
                        },
                        $title: function (resource) {
                            var prefix = resource ? '' : 'Step ' + (index + 1) + ': ';
                            return prefix + step.title;
                        }
                    },
                    controller: function ($scope, type, resource, wizard) {
                        $scope.type = type;
                        $scope.resource = resource;
                        $scope.wizard = wizard;
                    }
                });
        });
    });

    // function returnTo($transition$) {
    //     var redirectedFrom = $transition$.redirectedFrom();
    //     // The user was redirected to the login state (via the requiresAuth hook)
    //     if (redirectedFrom !== null) {
    //         while (redirectedFrom.redirectedFrom()) {
    //             redirectedFrom = redirectedFrom.redirectedFrom();
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
