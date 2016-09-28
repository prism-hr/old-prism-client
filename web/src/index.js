var angular = require('angular');
require('angular-animate');
require('angular-aria');
require('angular-google-maps');
require('angular-loading-bar');
require('angular-messages');
require('angular-material');
require('angular-sanitize');
require('angular-simple-logger');
require('angular-socialshare');
require('angular-translate');
require('angular-translate-loader-static-files');
require('lodash');
require('ng-file-upload');
require('restangular');
require('textAngular');
require('angular-ui-router');
require('angular-recaptcha');
require('satellizer');
require('rx-angular');
require('textangular/dist/textAngular-sanitize.min');
require('ng-img-crop-full-extended/compile/unminified/ng-img-crop');

var routes = require('./routes');
var generalConfig = require('./app/configuration/general.config');
var materialConfig = require('./app/configuration/material.config');
var serverInterceptor = require('./app/configuration/server-interceptor.config');
var authenticationHook = require('./app/unauthenticated/authentication.hook');
var ActivationService = require('./app/unauthenticated/activity.service');
var AuthService = require('./app/unauthenticated/auth.service');
var resourceManagerFactory = require('./app/create/resource-manager.factory');
var resourceCreateWizardFactory = require('./app/create/resource-create-wizard.factory');
var resourceCreateWizardStepHook = require('./app/create/resource-create-wizard-step.hook');

// Directives
var applicationLoader = require('./app/directives/application-loader');
var placeAutocomplete = require('./app/directives/place-autocomplete');
var imageSrc = require('./app/directives/image-src');

// Components
var dialog = require('./app/general/dialog/dialog');
var browserTitleHook = require('./app/general/browser-title.hook');
var welcome = require('./app/welcome/welcome');
var regswitch = require('./app/unauthenticated/regswitch/regswitch');
var authenticate = require('./app/unauthenticated/authenticate/authenticate');
var header = require('./app/general/header');
var sidebar = require('./app/general/sidebar');
var activities = require('./app/activities/activities');
var invited = require('./app/unauthenticated/invited.component');
var departmentWelcome = require('./app/create/department/department-welcome');
var promoterWelcome = require('./app/create/promoter/promoter-welcome');
var organization = require('./app/create/organization/organization');
var organizationLookup = require('./app/create/organization/organization-lookup');
var organizationSummary = require('./app/create/organization/organization-summary');
var organizationWeb = require('./app/create/organization/organization-web');
var organizationAssets = require('./app/create/organization/organization-assets');
var organizationPreview = require('./app/create/organization/organization-preview');
var organizationPreviewBox = require('./app/create/organization/organization-preview-box');
var advert = require('./app/create/advert/advert');
var advertCategory = require('./app/create/advert/advert-category');
var advertType = require('./app/create/advert/advert-type');
var advertHeader = require('./app/create/advert/advert-header');
var advertSalary = require('./app/create/advert/advert-salary');
var advertDetails = require('./app/create/advert/advert-details');
var advertAudience = require('./app/create/advert/advert-audience');
var advertPreview = require('./app/create/advert/advert-preview');
var employerView = require('./app/view/employer/employer-view');
var positionView = require('./app/view/position/position-view');
var department = require('./app/create/department/department');
var student = require('./app/create/student/student');

require('./index.scss');

var app = 'prismWeb';
module.exports = app;

var environment = require('./env.json')[ENVIRONMENT];

angular
    .module(app, [
        'ui.router',
        'ngMessages',
        'ngMaterial',
        'ngSanitize',
        'restangular',
        'vcRecaptcha',
        'ngFileUpload',
        'ngImgCrop',
        'satellizer',
        '720kb.socialshare',
        'angular-loading-bar',
        'ngAnimate',
        'textAngular',
        'pascalprecht.translate',
        'uiGmapgoogle-maps',
        'rx'
    ])
    .constant('environment', environment)
    .config(routes)
    .config(generalConfig.restangular)
    .config(generalConfig.satellizerConfig)
    .config(generalConfig.translateConfig)
    .config(materialConfig)
    .config(serverInterceptor)
    .service('ActivationService', ActivationService)
    .service('AuthService', AuthService)
    .service('resourceManagerFactory', resourceManagerFactory)
    .provider('resourceCreateWizardFactory', resourceCreateWizardFactory)
    .run(authenticationHook)
    .run(browserTitleHook)
    .run(resourceCreateWizardStepHook)
    .run(generalConfig.generalRun)
    .run(generalConfig.templateCacheConfig)
    .directive('applicationLoader', applicationLoader)
    .directive('placeAutocomplete', placeAutocomplete)
    .directive('imageSrc', imageSrc)
    .component('prismDialog', dialog)
    .component('welcome', welcome)
    .component('prismHeader', header)
    .component('sidebar', sidebar)
    .component('authenticate', authenticate)
    .component('regswitch', regswitch)
    .component('departmentWelcome', departmentWelcome)
    .component('promoterWelcome', promoterWelcome)
    .component('organization', organization)
    .component('organizationLookup', organizationLookup)
    .component('organizationSummary', organizationSummary)
    .component('organizationWeb', organizationWeb)
    .component('organizationAssets', organizationAssets)
    .component('organizationPreview', organizationPreview)
    .component('organizationPreviewBox', organizationPreviewBox)
    .component('advert', advert)
    .component('advertCategory', advertCategory)
    .component('advertType', advertType)
    .component('advertHeader', advertHeader)
    .component('advertSalary', advertSalary)
    .component('advertDetails', advertDetails)
    .component('advertAudience', advertAudience)
    .component('advertPreview', advertPreview)
    .component('employerView', employerView)
    .component('positionView', positionView)
    .component('department', department)
    .component('student', student)
    .component('activities', activities)
    .component('invited', invited);

