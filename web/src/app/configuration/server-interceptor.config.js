module.exports = severMessage;

/** @ngInject */
function severMessage($provide, $httpProvider) {
    $provide.factory('serverInterceptor', function ($q, $injector) {
        return {
            responseError: function (rejection) {
                var status = rejection.status;
                if (status) {
                    if (status === 500 || status === 501 || status === 503 || status === 408) {
                        var alert = $injector.get('$mdToast');
                        alert.show({
                            hideDelay: 5000,
                            position: 'top right',
                            templateUrl: './app/general/alert-server-error.html'
                        });
                    }
                }
                return $q.reject(rejection);
            }
        };
    });
    $httpProvider.interceptors.push('serverInterceptor');
}
