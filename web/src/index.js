var angular = require('angular');
require('angular-animate');
require('angular-aria');
require('angular-messages');
require('angular-material');
require('lodash');
require('restangular');
require('angular-ui-router');
require('api-check');
require('angular-recaptcha');

var welcome = require('./app/welcome/welcome');
var register = require('./app/unauthenticated/register/register');
var login = require('./app/unauthenticated/login/login');
var activities = require('./app/activities/activities');
var routes = require('./routes');
var generalConfig = require('./app/configuration/general.config');
var materialConfig = require('./app/configuration/material.config');
var authenticationHook = require('./app/unauthenticated/authentication.hook');
var activationService = require('./app/unauthenticated/activity.service');
var authService = require('./app/unauthenticated/auth.service');

require('./index.scss');

var app = 'prismWeb';
module.exports = app;

var environment = require('./env.json')[ENVIRONMENT];

angular
    .module(app, ['ui.router', 'ngMessages', 'ngMaterial', 'restangular', 'vcRecaptcha'])
    .constant('environment', environment)
    .config(routes)
    .config(generalConfig.restangular)
    .config(materialConfig)
    .service('activationService', activationService)
    .service('authService', authService)
    .run(authenticationHook)
    .run(generalConfig.generalRun)
    .component('welcome', welcome)
    .component('login', login)
    .component('register', register)
    .component('activities', activities);
