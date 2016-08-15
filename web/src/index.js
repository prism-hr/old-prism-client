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
var activationHook = require('./app/unauthenticated/activation.hook');
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
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.definePalette('prismblue', {
            '50': '#ffffff',
            '100': '#eef7fb',
            '200': '#c1e0f0',
            '300': '#88c4e1',
            '400': '#6fb8db',
            '500': '#57acd5',
            '600': '#3fa0cf',
            '700': '#3090bf',
            '800': '#2a7ea7',
            '900': '#246b8e',
            'A100': '#ffffff',
            'A200': '#eef7fb',
            'A400': '#6fb8db',
            'A700': '#3090bf',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 300 400 500 600 A100 A200 A400'
        });

        $mdThemingProvider.definePalette('prismgreen', {
            '50': '#ffffff',
            '100': '#c5efe6',
            '200': '#99e3d3',
            '300': '#61d4ba',
            '400': '#48cdb0',
            '500': '#35c2a3',
            '600': '#2eaa8f',
            '700': '#28927b',
            '800': '#217a66',
            '900': '#1b6252',
            'A100': '#ffffff',
            'A200': '#c5efe6',
            'A400': '#48cdb0',
            'A700': '#28927b',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 300 400 500 600 A100 A200 A400'
        });

        $mdThemingProvider.definePalette('prismred', {
            '50': '#ffffff',
            '100': '#fefaf9',
            '200': '#f8cec7',
            '300': '#f19688',
            '400': '#ed7e6c',
            '500': '#ea6651',
            '600': '#e74e36',
            '700': '#e2371b',
            '800': '#c73018',
            '900': '#ac2915',
            'A100': '#ffffff',
            'A200': '#fefaf9',
            'A400': '#ed7e6c',
            'A700': '#e2371b',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 300 400 500 A100 A200 A400'
        });

        $mdThemingProvider.theme('prism')
            .primaryPalette('prismblue')
            .accentPalette('prismgreen')
            .warnPalette('prismred')
            .backgroundPalette('grey');
        $mdThemingProvider.setDefaultTheme('prism')
    })
    .run(activationHook)
    .run(generalConfig.generalRun)
    .service('activationService', activationService)
    .service('authService', authService)
    .component('welcome', welcome)
    .component('login', login)
    .component('register', register)
    .component('activities', activities);
