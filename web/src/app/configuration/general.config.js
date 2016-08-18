module.exports = {
    restangular: restangularConfig,
    satellizerConfig: satellizerConfig,
    generalRun: generalRun
};

function restangularConfig(RestangularProvider) {
    var host = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
    RestangularProvider.setBaseUrl(host + '/prism/api');
}

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

function generalRun($rootScope, $transitions, $state, $http, AuthService) {
    $transitions.onError(null, function (transition) {
        console.log('Transition error');
    });
    $rootScope.$state = $state;

    // keep user logged in after page refresh
    AuthService.refreshTokenHeader();
    AuthService.loadUser();
}
