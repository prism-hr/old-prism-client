module.exports = {
    generalRun: generalRun,
    restangular: restangularConfig,
    satellizerConfig: satellizerConfig,
    translateConfig: translateConfig
};

/** @ngInject */
function generalRun($rootScope, $transitions, $state, AuthService) {
    $transitions.onError(null, function () {
        console.log('Transition error');
    });
    $rootScope.$state = $state;
    $rootScope.AuthService = AuthService;

    // keep user logged in after page refresh
    AuthService.refreshTokenHeader();
    AuthService.loadUser();
}

/** @ngInject */
function restangularConfig(RestangularProvider) {
    var host = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
    RestangularProvider.setBaseUrl(host + '/prism/api');
}

/** @ngInject */
function satellizerConfig($authProvider, environment) {
    $authProvider.linkedin({
        clientId: environment.oauth.linkedin,
        url: 'prism/api/public/authenticate/linkedin',
        requiredUrlParams: ['state', 'scope'],
        scopePrefix: '',
        scopeDelimiter: ''
    });
    $authProvider.facebook({
        clientId: environment.oauth.facebook,
        url: 'prism/api/public/authenticate/facebook'
    });
}

/** @ngInject */
function translateConfig($translateProvider) {
    $translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider.useStaticFilesLoader({
        prefix: 'locale-',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
}
