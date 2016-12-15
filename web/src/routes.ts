import * as angular from 'angular';
import * as _ from 'lodash';
import {StateProvider, UrlRouterProvider} from 'angular-ui-router';
import UserRepresentation = bigfoot.UserRepresentation;

export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider: StateProvider,
                      $urlRouterProvider: UrlRouterProvider,
                      $locationProvider: angular.ILocationProvider,
                      resourceCreateWizardFactoryProvider: any) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/404');

    $stateProvider
        .state('404', {
            url: '/404',
            template: require('./app/404.html'),
            resolve: {
                $title: _.wrap('404', _.identity)
            }
        })
        .state('mainWelcome', {
            url: '/?accessCode&action',
            component: 'welcome',
            resolve: {
                /** @ngInject */
                    referral($stateParams: any, Restangular: Restangular.IService) {
                    return $stateParams.accessCode && Restangular.one('public').one('activityReferrals', $stateParams.accessCode).get()
                            .then(referral => referral.plain());
                },
                $title: _.wrap('Welcome', _.identity)
            }
        })
        .state('welcome', {
            url: '/welcome',
            abstract: true,
            template: '<ui-view></ui-view>',
            data: {auth: true},
            params: {
                showRegistration: false
            }
        })
        .state('welcome.promoter', {
            url: '/promoter',
            component: 'promoterWelcome',
            resolve: {
                $title: _.wrap('Welcome Advertiser', _.identity)
            }
        })
        .state('promoterNew', {
            url: '/promoter-new',
            component: 'promoterNew',
            resolve: {
                $title: _.wrap('Advertise', _.identity)
            }
        })
        .state('welcome.department', {
            url: '/department',
            component: 'departmentWelcome',
            resolve: {
                $title: _.wrap('Welcome University', _.identity)
            }
        })
        .state('welcome.student', {
            url: '/student',
            component: 'studentWelcome',
            resolve: {
                $title: _.wrap('Welcome Student', _.identity)
            }
        })
        .state('manage', {
            url: '/manage',
            abstract: true,
            data: {auth: true}
        })
        .state('manage.promoter', {
            url: '/promoter/{id}?welcomeType',
            abstract: true,
            views: {
                '!header': 'wizardHeader',
                '!$default': 'organization'
            },
            data: {auth: true},
            resolve: {
                welcomeType: function ($stateParams: any) {
                    return $stateParams.welcomeType;
                },
                wizardType: _.wrap('promoter', _.identity),
                wizard($stateParams: any, resourceManagerFactory: any, resourceCreateWizardFactory: any, wizardType: string) {
                    const source = $stateParams.id === 'new' ? {} : $stateParams.id;
                    return resourceManagerFactory.getManager(source, wizardType)
                        .then(resourceManager => resourceCreateWizardFactory.getWizard(resourceManager, $stateParams.welcomeType, wizardType));
                },
                $title: _.wrap('Company Information', _.identity)
            }
        })

        .state('manage.department', {
            url: '/department/{id}?welcomeType',
            abstract: true,
            views: {
                '!header': 'wizardHeader',
                '!$default': 'organization'
            },
            data: {auth: true},
            resolve: {
                welcomeType: function ($stateParams: any) {
                    return $stateParams.welcomeType;
                },
                wizardType: _.wrap('department', _.identity),
                wizard($stateParams: any, resourceManagerFactory: any, resourceCreateWizardFactory: any, wizardType: string) {
                    const source = $stateParams.id === 'new' ? {} : $stateParams.id;
                    return resourceManagerFactory.getManager(source, wizardType)
                        .then(resourceManager => resourceCreateWizardFactory.getWizard(resourceManager, $stateParams.welcomeType, wizardType));
                },
                $title: _.wrap('University Information', _.identity)
            }
        })
        .state('manage.advert', {
            url: '/advert/{id}?welcomeType&organization',
            abstract: true,
            views: {
                '!header': 'wizardHeader',
                '!$default': 'advert'
            },
            data: {auth: true},
            resolve: {
                wizardType: _.wrap('advert', _.identity),
                wizard($stateParams: any, resourceManagerFactory: any, resourceCreateWizardFactory: any, wizardType: string) {
                    const source = $stateParams.id === 'new' ? {organizationImplementation: {accessCode: $stateParams.organization}} : $stateParams.id;
                    return resourceManagerFactory.getManager(source, wizardType)
                        .then(resourceManager => resourceCreateWizardFactory.getWizard(resourceManager, $stateParams.welcomeType, wizardType));
                },
                $title: _.wrap('Advert', _.identity)
            }
        })
        .state('manage.audience', {
            url: '/audience/{id}?welcomeType',
            abstract: true,
            views: {
                '!header': 'wizardHeader',
                '!$default': 'audience'
            },
            data: {auth: true},
            resolve: {
                wizardType: _.wrap('audience', _.identity),
                wizard($stateParams: any, resourceManagerFactory: any, resourceCreateWizardFactory: any, wizardType: string) {
                    const source = $stateParams.id;
                    return resourceManagerFactory.getManager(source, 'advert')
                        .then(resourceManager => resourceCreateWizardFactory.getWizard(resourceManager, $stateParams.welcomeType, wizardType));
                },
                $title: _.wrap('Audience', _.identity)
            }
        })
        .state('manage.student', {
            url: '/student?welcomeType',
            abstract: true,
            views: {
                '!header': 'wizardHeader',
                '!$default': 'student'
            },
            data: {auth: true},
            resolve: {
                wizardType: _.wrap('student', _.identity),
                wizard($stateParams: any, userManagerFactory: any, resourceCreateWizardFactory: any, wizardType: string) {
                    return userManagerFactory.getManager()
                        .then(resourceManager => resourceCreateWizardFactory.getWizard(resourceManager, $stateParams.welcomeType, wizardType));
                },
                $title: _.wrap('Student', _.identity)
            }
        })
        .state('view', {
            abstract: true
        })
        .state('view.promoter', {
            url: '/promoter/{accessCode}',
            views: {
                '!$default': 'promoterView'
            },
            resolve: {
                promoter($stateParams: any, Restangular: Restangular.IService) {
                    return Restangular.one('organizationImplementations', $stateParams.accessCode).get();
                },
                $title: _.wrap('Employer', _.identity)
            }
        })
        .state('view.department', {
            url: '/department/{accessCode}',
            views: {
                '!$default': 'departmentView'
            },
            resolve: {
                department($stateParams: any, Restangular: Restangular.IService) {
                    return Restangular.one('organizationImplementations', $stateParams.accessCode).get();
                },
                $title: _.wrap('Department', _.identity)
            }
        })
        .state('view.advert', {
            url: '/advert/{accessCode}',
            views: {
                '!header': 'advertViewHeader',
                '!$default': 'advertView'
            },
            resolve: {
                advert($stateParams: any, Restangular: Restangular.IService) {
                    return Restangular.one('promotions', $stateParams.accessCode).get();
                },
                $title: _.wrap('Graduate Software and Electronics Engineers', _.identity)
            }
        })
        .state('view.student', {
            url: '/student/{accessCode}',
            views: {
                '!$default': 'studentView'
            },
            data: {auth: true},
            resolve: {
                $title: _.wrap('Student', _.identity)
            }
        })
        .state('activities', {
            url: '/activities',
            component: 'activities',
            data: {auth: true},
            resolve: {
                /** @ngInject */
                    activities(Restangular: Restangular.IService) {
                    return Restangular.one('userActivities').get({state: 'PENDING'});
                },
                $title: _.wrap('Activities', _.identity)
            }
        });

    _.each(resourceCreateWizardFactoryProvider.getStepDefinitions(), (definitions, resourceType) => {
        _.each(definitions, (step, index) => {
            const data = angular.copy(step.data) || {};
            data.stepIdx = index;
            let resourceTypeLower = resourceType.toLowerCase();
            if (resourceTypeLower === 'promoter' || resourceTypeLower === 'department') {
                resourceTypeLower = 'organization';
            }
            $stateProvider
                .state('manage.' + resourceType.toLowerCase() + '.' + step.id, {
                    url: '/' + step.id,
                    views: {
                        $default: {
                            component: step.component,
                            bindings: {
                                [resourceTypeLower]: 'resource'
                            }
                        },
                        buttons: 'wizardButtons'
                    },
                    data,
                    resolve: {
                        form(wizard: any) {
                            return wizard.form;
                        },
                        resource(wizard: any) {
                            return wizard.getResource();
                        },
                        $title() {
                            return step.title;
                        }
                    }
                });
        });
    });

    $stateProvider
        .state('manage.student.qualifications.edit', {
            url: '/{qualificationAccessCode}',
            views: {
                '!$default.$default': 'studentEditQualification',
                '!header': 'studentEditQualificationButtons',
                '^.^.buttons': 'studentEditQualificationButtons'
            },
            resolve: {
                qualificationService(studentEditQualificationService: any, resource: UserRepresentation, $stateParams: any) {
                    const accessCode = $stateParams.qualificationAccessCode === 'new' ? null : $stateParams.qualificationAccessCode;
                    return studentEditQualificationService.create(resource, accessCode);
                },
                $title: _.wrap('Qualification', _.identity)
            }
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
