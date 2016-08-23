var angular = require('angular');
require('angular-animate');
require('angular-aria');
require('angular-loading-bar');
require('angular-messages');
require('angular-material');
require('lodash');
require('ng-file-upload');
require('restangular');
require('angular-ui-router');
require('api-check');
require('angular-recaptcha');
require('satellizer');

var routes = require('./routes');
var generalConfig = require('./app/configuration/general.config');
var materialConfig = require('./app/configuration/material.config');
var authenticationHook = require('./app/unauthenticated/authentication.hook');
var ActivationService = require('./app/unauthenticated/activity.service');
var AuthService = require('./app/unauthenticated/auth.service');

// Directives
var applicationLoader = require('./app/directives/application-loader');
var placeAutocomplete = require('./app/directives/place-autocomplete');
var fileUpload = require('./app/directives/file-upload');

// Components
var dialog = require('./app/general/dialog/dialog');
var welcome = require('./app/welcome/welcome');
var register = require('./app/unauthenticated/register/register');
var regswitch = require('./app/unauthenticated/regswitch/regswitch');
var login = require('./app/unauthenticated/login/login');
var header = require('./app/general/header');
var activities = require('./app/activities/activities');
var invited = require('./app/unauthenticated/invited.component');
var organizationLookup = require('./app/create/organization-lookup');
var employer = require('./app/create/employer/employer');
var employerOrganization = require('./app/create/employer/employer-organization');
var university = require('./app/create/university/university');
var universityOrganization = require('./app/create/university/university-organization');
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
        'restangular',
        'vcRecaptcha',
        'ngFileUpload',
        'satellizer',
        'angular-loading-bar',
        'ngAnimate'
    ])
    .constant('environment', environment)
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 100;
    }])
    .config(routes)
    .config(generalConfig.restangular)
    .config(generalConfig.satellizerConfig)
    .config(materialConfig)
    .service('ActivationService', ActivationService)
    .service('AuthService', AuthService)
    .run(authenticationHook)
    .run(generalConfig.generalRun)
    .directive('applicationLoader', applicationLoader)
    .directive('placeAutocomplete', placeAutocomplete)
    .directive('clientFileUpload', fileUpload)
    .component('prismDialog', dialog)
    .component('welcome', welcome)
    .component('header', header)
    .component('login', login)
    .component('register', register)
    .component('regswitch', regswitch)
    .component('organizationLookup', organizationLookup)
    .component('employer', employer)
    .component('employerOrganization', employerOrganization)
    .component('university', university)
    .component('universityOrganization', universityOrganization)
    .component('student', student)
    .component('activities', activities)
    .component('invited', invited);

