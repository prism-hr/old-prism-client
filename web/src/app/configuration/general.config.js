module.exports = {
    generalRun: generalRun,
    templateCacheConfig: templateCacheConfig,
    restangular: restangularConfig,
    satellizerConfig: satellizerConfig,
    translateConfig: translateConfig,
    ladingConfigurationBar: ladingConfigurationBar
};

/** @ngInject */
function generalRun($rootScope, $transitions, $state, Restangular, AuthService) {
    $transitions.onError(null, function () {
        console.log('Transition error');
    });
    $rootScope.$state = $state;
    $rootScope.AuthService = AuthService;
    $rootScope.documentsUrl = Restangular.one('public').all('documents').getRestangularUrl() + '/';

    // keep user logged in after page refresh
    AuthService.refreshTokenHeader();
    AuthService.loadUser();
}

/** @ngInject */
function templateCacheConfig($templateCache) {
    $templateCache.put('login.view.html', require('../unauthenticated/authenticate/login.view.html'));
    $templateCache.put('register.view.html', require('../unauthenticated/authenticate/register.view.html'));
    $templateCache.put('forgot-password.view.html', require('../unauthenticated/authenticate/forgot-password.view.html'));
    $templateCache.put('footer.html', require('../general/footer.html'));
}

/** @ngInject */
function ladingConfigurationBar(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 100;
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
