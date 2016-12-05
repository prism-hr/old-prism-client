export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider, resourceCreateWizardFactoryProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/404');

    $stateProvider
        .state('404', {
            url: '/404',
            views: {
                content: {
                    template: require('./app/404.html')
                }
            },
            resolve: {
                $title: _.wrap('404')
            }
        })
        .state('invited', {
            url: '/invited?accessCode&action',
            views: {
                content: 'invited'
            },
            resolve: {
                /** @ngInject */
                referral($stateParams, Restangular) {
                    return Restangular.one('public').one('activityReferrals', $stateParams.accessCode).get()
                        .then(referral => referral.plain());
                },
                $title: _.wrap('Invited')
            }
        })
        .state('mainWelcome', {
            url: '/',
            views: {
                content: 'welcome'
            },
            resolve: {
                $title: _.wrap('Welcome')
            }
        })
        .state('welcome', {
            url: '/welcome',
            abstract: true,
            views: {
                content: {
                    template: '<ui-view name="content"></ui-view>'
                }
            },
            data: {auth: true},
            params: {
                showRegistration: false
            }
        })
        .state('welcome.promoter', {
            url: '/promoter',
            views: {
                content: 'promoterWelcome'
            },
            resolve: {
                $title: _.wrap('Welcome Advertiser')
            }
        })
        .state('welcome.department', {
            url: '/department',
            views: {
                content: 'departmentWelcome'
            },
            resolve: {
                $title: _.wrap('Welcome University')
            }
        })
        .state('welcome.student', {
            url: '/student',
            views: {
                content: 'studentWelcome'
            },
            resolve: {
                $title: _.wrap('Student')
            }
        })
        .state('manage', {
            url: '/manage',
            abstract: true,
            views: {
                header: {
                    template: '<ui-view name="header"></ui-view>'
                },
                content: {
                    template: '<ui-view name="content"></ui-view>'
                }
            },
            data: {auth: true}
        })
        .state('manage.promoter', {
            url: '/promoter/{id}?welcomeType',
            abstract: true,
            views: {
                header: 'wizardButtons',
                content: 'organization'
            },
            data: {auth: true},
            resolve: {
                welcomeType: function ($stateParams) {
                    return $stateParams.welcomeType;
                },
                wizardType: _.wrap('promoter'),
                wizard($stateParams, resourceManagerFactory, resourceCreateWizardFactory, wizardType) {
                    const source = $stateParams.id === 'new' ? {} : $stateParams.id;
                    return resourceManagerFactory.getManager(source, wizardType)
                        .then(resourceManager => resourceCreateWizardFactory.getWizard(resourceManager, $stateParams.welcomeType, wizardType));
                },
                $title: _.wrap('Company Information')
            }
        })

        .state('manage.department', {
            url: '/department/{id}?welcomeType',
            abstract: true,
            views: {
                header: 'wizardButtons',
                content: 'organization'
            },
            data: {auth: true},
            resolve: {
                welcomeType: function ($stateParams) {
                    return $stateParams.welcomeType;
                },
                wizardType: _.wrap('department'),
                wizard($stateParams, resourceManagerFactory, resourceCreateWizardFactory, wizardType) {
                    const source = $stateParams.id === 'new' ? {} : $stateParams.id;
                    return resourceManagerFactory.getManager(source, wizardType)
                        .then(resourceManager => resourceCreateWizardFactory.getWizard(resourceManager, $stateParams.welcomeType, wizardType));
                },
                $title: _.wrap('University Information')
            }
        })
        .state('manage.advert', {
            url: '/advert/{id}?welcomeType&organization',
            abstract: true,
            views: {
                header: 'wizardButtons',
                content: 'advert'
            },
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
        .state('manage.audience', {
            url: '/audience/{id}?welcomeType',
            abstract: true,
            views: {
                header: 'wizardButtons',
                content: 'audience'
            },
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
        .state('manage.student', {
            url: '/student/{id}?welcomeType',
            abstract: true,
            views: {
                header: 'wizardButtons',
                content: 'student'
            },
            data: {auth: true},
            resolve: {
                wizardType: _.wrap('student'),
                wizard($stateParams, userManagerFactory, resourceCreateWizardFactory, wizardType) {
                    return userManagerFactory.getManager()
                        .then(resourceManager => resourceCreateWizardFactory.getWizard(resourceManager, $stateParams.welcomeType, wizardType));
                },
                $title: _.wrap('Student')
            }
        })
        .state('view', {
            abstract: true,
            views: {
                header: {
                    template: '<ui-view name="header"></ui-view>'
                },
                content: {
                    template: '<ui-view name="content"></ui-view>'
                }
            }
        })
        .state('view.promoter', {
            url: '/promoter/{accessCode}',
            views: {
                content: 'promoterView'
            },
            resolve: {
                promoter($stateParams, Restangular) {
                    return Restangular.one('organizationImplementations', $stateParams.accessCode).get();
                },
                $title: _.wrap('Employer')
            }
        })
        .state('view.department', {
            url: '/department/{accessCode}',
            views: {
                content: 'departmentView'
            },
            resolve: {
                department($stateParams, Restangular) {
                    return Restangular.one('organizationImplementations', $stateParams.accessCode).get();
                },
                $title: _.wrap('Department')
            }
        })
        .state('view.advert', {
            url: '/advert/{accessCode}',
            views: {
                header: 'advertViewHeader',
                content: 'advertView'
            },
            resolve: {
                advert($stateParams, Restangular) {
                    return Restangular.one('promotions', $stateParams.accessCode).get();
                },
                $title: _.wrap('Graduate Software and Electronics Engineers')
            }
        })
        .state('view.student', {
            url: '/student/{accessCode}',
            views: {
                content: 'studentView'
            },
            data: {auth: true},
            resolve: {
                $title: _.wrap('Student')
            }
        })
        .state('activities', {
            url: '/activities',
            views: {
                content: 'activities'
            },
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
                .state('manage.' + resourceType.toLowerCase() + '.' + step.id, {
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
