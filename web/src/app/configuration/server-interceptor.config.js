module.exports = severMessage;

/** @ngInject */
function severMessage($provide, $httpProvider) {
    $provide.factory('serverInterceptor', function ($q, $injector) {
        return {
            request: function (config) {
                // console.log(config); // Contains the data about the request before it is sent.
                return config || $q.when(config);
            },
            // On request failure
            requestError: function (rejection) {
                console.log(rejection); // Contains the data about the error on the request.
                return $q.reject(rejection);
            },
            // On response success
            response: function (response) {
                // console.log(response); // Contains the data from the response.
                return response || $q.when(response);
            },
            // On response failture
            responseError: function (rejection) {
                console.log(rejection);
                var status = rejection.status;
                if (status) {
                    if (status === 500 || status === 501 || status === 503 || status === 408) {
                        var alert = $injector.get('$mdToast');
                        alert.show({
                                hideDelay   : 5000,
                                position    : 'top right',
                                templateUrl : './app/general/alert-server-error.html'
                            });
                    }
                }
                return $q.reject(rejection);
            }
        };
    });
    $httpProvider.interceptors.push('serverInterceptor');
}