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
var routes = require('./routes');
var generalConfig = require('./app/configuration/general.config');
var activationHook = require('./app/unauthenticated/activation.hook');
var activationService = require('./app/unauthenticated/activity.service');

require('./index.scss');

var app = 'prismWeb';
module.exports = app;

var environment = require('./env.json')[ENVIRONMENT];

angular
    .module(app, ['ui.router', 'ngMessages', 'ngMaterial', 'restangular', 'vcRecaptcha'])
    .constant('environment', environment)
    .config(routes)
    .config(generalConfig.restangular)
    .run(activationHook)
    .run(generalConfig.errorHook)
    .service('activationService', activationService)
    .component('welcome', welcome)
    .component('login', login)
    .component('register', register);
