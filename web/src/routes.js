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
                activity($stateParams, activityService) {
                    return $stateParams.accessCode && activityService.getActivity($stateParams.accessCode, $stateParams.action);
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
            url: '/promoter/{id}?welcomeType',
            abstract: true,
            component: 'organization',
            data: {auth: true},
            resolve: {
                wizardType: _.wrap('promoter'),
                wizard($stateParams, resourceManagerFactory, resourceCreateWizardFactory, wizardType) {
                    const source = $stateParams.id === 'new' ? {} : $stateParams.id;
                    return resourceManagerFactory.getManager(source, wizardType)
                        .then(resourceManager => resourceCreateWizardFactory.getWizard(resourceManager, $stateParams.welcomeType, wizardType));
                },
                $title: _.wrap('Company Information')
            }
        })
        .state('departmentWelcome', {
            url: '/department/welcome',
            component: 'departmentWelcome',
            data: {auth: true},
            params: {
                showRegistration: false
            },
            resolve: {
                $title: _.wrap('Welcome University')
            }
        })
        .state('department', {
            url: '/department/{id}?welcomeType',
            abstract: true,
            component: 'organization',
            data: {auth: true},
            resolve: {
                wizardType: _.wrap('department'),
                wizard($stateParams, resourceManagerFactory, resourceCreateWizardFactory, wizardType) {
                    const source = $stateParams.id === 'new' ? {} : $stateParams.id;
                    return resourceManagerFactory.getManager(source, wizardType)
                        .then(resourceManager => resourceCreateWizardFactory.getWizard(resourceManager, $stateParams.welcomeType, wizardType));
                },
                $title: _.wrap('University Information')
            }
        })
        .state('advert', {
            url: '/advert/{id}?welcomeType&organization',
            abstract: true,
            component: 'advert',
            data: {auth: true},
            resolve: {
                wizardType: _.wrap('advert'),
                wizard($stateParams, resourceManagerFactory, resourceCreateWizardFactory, wizardType) {
                    const source = $stateParams.id === 'new' ? {organizationImplementation: {accessCode: $stateParams.organization}} : $stateParams.id;
                    return resourceManagerFactory.getManager(source, wizardType)
                        .then(resourceManager => resourceCreateWizardFactory.getWizard(resourceManager, $stateParams.welcomeType, wizardType));
                },
                $title: _.wrap('Advert')
            }
        })
        .state('audience', {
            url: '/audience/{id}?welcomeType',
            abstract: true,
            component: 'audience',
            data: {auth: true},
            resolve: {
                wizardType: _.wrap('audience'),
                wizard($stateParams, resourceManagerFactory, resourceCreateWizardFactory, wizardType) {
                    const source = $stateParams.id;
                    return resourceManagerFactory.getManager(source, 'advert')
                        .then(resourceManager => resourceCreateWizardFactory.getWizard(resourceManager, $stateParams.welcomeType, wizardType));
                },
                $title: _.wrap('Audience')
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
            params: {
                showRegistration: false
            },
            resolve: {
                $title: _.wrap('Student')
            }
        })
        .state('student', {
            url: '/student/{id}?welcomeType',
            abstract: true,
            component: 'student',
            data: {auth: true},
            resolve: {
                wizardType: _.wrap('student'),
                wizard($stateParams, resourceManagerFactory, resourceCreateWizardFactory, wizardType) {
                    return resourceManagerFactory.getManager($stateParams.id, wizardType)
                        .then(resourceManager => resourceCreateWizardFactory.getWizard(resourceManager, $stateParams.welcomeType, wizardType));
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
                    return Restangular.one('userActivities').get({state: 'PENDING'});
                },
                $title: _.wrap('Activities')
            }

        });

    _.each(resourceCreateWizardFactoryProvider.getStepDefinitions(), (definitions, resourceType) => {
        _.each(definitions, (step, index) => {
            const data = angular.copy(step.data) || {};
            data.stepIdx = index;
            const component = _.kebabCase(step.component);
            let resourceTypeLower = resourceType.toLowerCase();
            if (resourceTypeLower === 'promoter' || resourceTypeLower === 'department') {
                resourceTypeLower = 'organization';
            }
            const template = `<${component} welcome-type="{{welcomeType}}" wizard-type="{{wizardType}}" form="${resourceTypeLower}Form" ${resourceTypeLower}="resource" wizard="wizard"></${component}>`;
            $stateProvider
                .state(resourceType.toLowerCase() + '.' + step.id, {
                    url: '/' + step.id,
                    template,
                    data,
                    resolve: {
                        resource(wizard) {
                            return wizard.getResource();
                        },
                        $title() {
                            return step.title;
                        }
                    },
                    /** @ngInject */
                    controller: function ($scope, $stateParams, wizardType, resource, wizard) {
                        $scope.welcomeType = $stateParams.welcomeType;
                        $scope.wizardType = wizardType;
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
