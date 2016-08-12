module.exports = {
    restangular: restangularConfig,
    errorHook: errorHook
};

/** @ngInject */
function restangularConfig(RestangularProvider) {
    var host = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
    RestangularProvider.setBaseUrl(host + '/prism/api');
}

function errorHook($transitions) {
    $transitions.onError(null, function () {
        console.log('Transition error');
    });
}
