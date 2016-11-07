/** @ngInject */
export const generalRun = function ($rootScope, $transitions, $state, Restangular, authService) {
    $transitions.onError(null, () => {
        console.log('Transition error');
    });
    $rootScope.$state = $state;
    $rootScope.authService = authService;
    $rootScope.documentsUrl = Restangular.one('public').all('documents').getRestangularUrl() + '/';
};

/** @ngInject */
export const templateCacheConfig = function ($templateCache) {
    $templateCache.put('login.view.html', require('../unauthenticated/authenticate/login.view.html'));
    $templateCache.put('register.view.html', require('../unauthenticated/authenticate/register.view.html'));
    $templateCache.put('forgot-password.view.html', require('../unauthenticated/authenticate/forgot-password.view.html'));
    $templateCache.put('footer.html', require('../general/footer.html'));
};

/** @ngInject */
export const restangularConfig = function (RestangularProvider) {
    const host = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
    RestangularProvider.setBaseUrl(host + '/prism/api');
};

/** @ngInject */
export const satellizerConfig = function ($authProvider, SatellizerConfig, environment) {
    SatellizerConfig.httpInterceptor = function () {
    };
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
};

/** @ngInject */
export const translateConfig = function ($translateProvider) {
    $translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider.useStaticFilesLoader({
        prefix: 'locale-',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
};

/** @ngInject */
export const cloudinaryConfig = function (cloudinaryProvider) {
    const uploadEndpoint = 'upload_endpoint';
    const cloudName = 'cloud_name';
    const uploadPreset = 'upload_preset';
    const config = {
        [uploadEndpoint]: 'https://api.cloudinary.com/v1_1/',
        [cloudName]: 'bigfoot',
        [uploadPreset]: 'unsigned'
    };
    cloudinaryProvider.config(config);
};
