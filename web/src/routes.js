export default routesConfig;

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
                activity($stateParams, ActivityService) {
                    return $stateParams.accessCode && ActivityService.getActivity($stateParams.accessCode, $stateParams.action);
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
                wizard($stateParams, resourceManagerFactory, resourceCreateWizardFactory, type) {
                    return resourceManagerFactory.getManager($stateParams.id, type)
                        .then(resourceManager => resourceCreateWizardFactory.getWizard(resourceManager, type));
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
                wizard($stateParams, resourceManagerFactory, resourceCreateWizardFactory, type) {
                    return resourceManagerFactory.getManager($stateParams.id, type)
                        .then(resourceManager => resourceCreateWizardFactory.getWizard(resourceManager, type));
                },
                $title: _.wrap('University Information')
            }
        })
        .state('advert', {
            url: '/advert/{id:new|\\d+}',
            abstract: true,
            component: 'advert',
            data: {auth: true},
            resolve: {
                type: _.wrap('ADVERT'),
                wizard($stateParams, resourceManagerFactory, resourceCreateWizardFactory, type) {
                    return resourceManagerFactory.getManager($stateParams.id, type)
                        .then(resourceManager => resourceCreateWizardFactory.getWizard(resourceManager, type));
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
        .state('studentWelcome', {
            url: '/student/welcome',
            component: 'studentWelcome',
            data: {auth: true},
            resolve: {
                $title: _.wrap('Student')
            }
        })
        .state('student', {
            url: '/student/{id:new|\\d+}',
            abstract: true,
            component: 'student',
            data: {auth: true},
            resolve: {
                type: _.wrap('STUDENT'),
                wizard($stateParams, resourceManagerFactory, resourceCreateWizardFactory, type) {
                    return resourceManagerFactory.getManager($stateParams.id, type)
                        .then(resourceManager => resourceCreateWizardFactory.getWizard(resourceManager, type));
                },
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
                activities(Restangular) {
                    return Restangular.one('user', 'activities').get({state: 'PENDING'});
                },
                $title: _.wrap('Activities')
            }

        });

    _.each(['PROMOTER', 'DEPARTMENT', 'ADVERT', 'STUDENT'], resourceType => {
        _.each(resourceCreateWizardFactoryProvider.getStepDefinitions(resourceType), (step, index) => {
            const data = angular.copy(step.data) || {};
            data.stepIdx = index;
            const component = _.kebabCase(step.component);
            let template;
            if (resourceType === 'ADVERT') {
                template = '<' + component + ' type="{{type}}" form="advertForm" advert="resource" wizard="wizard"></' + component + '>';
            } else if (resourceType === 'STUDENT') {
                template = '<' + component + ' type="{{type}}" form="studentForm" student="resource" wizard="wizard"></' + component + '>';
            } else {
                template = '<' + component + ' type="{{type}}" form="organizationForm" organization="resource" wizard="wizard"></' + component + '>';
            }
            $stateProvider
                .state(resourceType.toLowerCase() + '.' + step.id, {
                    url: '/' + step.id,
                    template,
                    data,
                    resolve: {
                        resource(wizard) {
                            return wizard.getResource();
                        },
                        $title(resource) {
                            const prefix = resource.state === 'DRAFT' ? 'Step ' + (index + 1) + ': ' : '';
                            return prefix + step.title;
                        }
                    },
                    /** @ngInject */
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
