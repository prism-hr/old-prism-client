var angular = require('angular');
require('angular-animate');
require('angular-aria');
require('angular-loading-bar');
require('angular-messages');
require('angular-material');
require('lodash');
require('restangular');
require('angular-ui-router');
require('api-check');
require('angular-recaptcha');
require('satellizer');

var routes = require('./routes');
var generalConfig = require('./app/configuration/general.config');
var materialConfig = require('./app/configuration/material.config');
var authenticationHook = require('./app/unauthenticated/authentication.hook');
var mAppLoading = require('./app/general/mAppLoading');
var ActivationService = require('./app/unauthenticated/activity.service');
var AuthService = require('./app/unauthenticated/auth.service');
var dialog = require('./app/general/dialog/dialog');
var welcome = require('./app/welcome/welcome');
var register = require('./app/unauthenticated/register/register');
var login = require('./app/unauthenticated/login/login');
var header = require('./app/general/header');
var activities = require('./app/activities/activities');
var invited = require('./app/unauthenticated/invited.component');
var employer = require('./app/unauthenticated/register/employer/employer');

require('./index.scss');

var app = 'prismWeb';
module.exports = app;

var environment = require('./env.json')[ENVIRONMENT];

angular
    .module(app, ['ui.router', 'ngMessages', 'ngMaterial', 'restangular', 'vcRecaptcha', 'satellizer', 'angular-loading-bar', 'ngAnimate'])
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
    .component('prismDialog', dialog)
    .component('welcome', welcome)
    .component('header', header)
    .component('login', login)
    .component('register', register)
    .component('employer', employer)
    .component('activities', activities)
    .component('invited', invited)
    .directive('mAppLoading', mAppLoading);

