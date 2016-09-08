var angular = require('angular');
require('angular-animate');
require('angular-aria');
require('angular-google-maps');
require('angular-loading-bar');
require('angular-messages');
require('angular-material');
require('angular-sanitize');
require('angular-simple-logger');
require('angular-translate');
require('angular-translate-loader-static-files');
require('lodash');
require('ng-file-upload');
require('restangular');
require('angular-ui-router');
require('angular-recaptcha');
require('satellizer');

var routes = require('./routes');
var generalConfig = require('./app/configuration/general.config');
var materialConfig = require('./app/configuration/material.config');
var serverInterceptor = require('./app/configuration/server-interceptor.config');
var authenticationHook = require('./app/unauthenticated/authentication.hook');
var ActivationService = require('./app/unauthenticated/activity.service');
var AuthService = require('./app/unauthenticated/auth.service');
var employerManagerFactory = require('./app/create/employer/employer-manager.factory');
var createSteps = require('./app/create/create-steps.configuration');

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
var organizationCategory = require('./app/create/organization/organization-category');
var organizationLookup = require('./app/create/organization/organization-lookup');
var organizationSummary = require('./app/create/organization/organization-summary');
var organizationAddress = require('./app/create/organization/organization-address');
var organizationAssets = require('./app/create/organization/organization-assets');
var organizationPreview = require('./app/create/organization/organization-preview');
var organizationPreviewBox = require('./app/create/organization/organization-preview-box');
var employerWelcome = require('./app/create/employer/employer-welcome');
var employerView = require('./app/view/employer/employer-view');
var positionView = require('./app/view/position/position-view');
var employer = require('./app/create/employer/employer');
var position = require('./app/create/position/position');
var universityWelcome = require('./app/create/university/university-welcome');
var university = require('./app/create/university/university');
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
        'satellizer',
        'angular-loading-bar',
        'ngAnimate',
        'pascalprecht.translate',
        'uiGmapgoogle-maps'
    ])
    .constant('environment', environment)
    .constant('createSteps', createSteps)
    .config(routes)
    .config(generalConfig.restangular)
    .config(generalConfig.satellizerConfig)
    .config(generalConfig.translateConfig)
    .config(materialConfig)
    .config(serverInterceptor)
    .service('ActivationService', ActivationService)
    .service('AuthService', AuthService)
    .service('employerManagerFactory', employerManagerFactory)
    .run(authenticationHook)
    .run(browserTitleHook)
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
    .component('organizationCategory', organizationCategory)
    .component('organizationLookup', organizationLookup)
    .component('organizationSummary', organizationSummary)
    .component('organizationAddress', organizationAddress)
    .component('organizationAssets', organizationAssets)
    .component('organizationPreview', organizationPreview)
    .component('organizationPreviewBox', organizationPreviewBox)
    .component('employerWelcome', employerWelcome)
    .component('employerView', employerView)
    .component('positionView', positionView)
    .component('employer', employer)
    .component('position', position)
    .component('universityWelcome', universityWelcome)
    .component('university', university)
    .component('student', student)
    .component('activities', activities)
    .component('invited', invited);

