module.exports = {
    restangular: restangularConfig,
    generalRun: generalRun
};

/** @ngInject */
function restangularConfig(RestangularProvider) {
    var host = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
    RestangularProvider.setBaseUrl(host + '/prism/api');
}

function generalRun($rootScope, $transitions, $state, $http) {
    $transitions.onError(null, function () {
        console.log('Transition error');
    });
    $rootScope.$state = $state;

    // keep user logged in after page refresh
    if (localStorage.userToken) {
        $http.defaults.headers.common['X-Auth-Token'] = localStorage.userToken;
    }
}
