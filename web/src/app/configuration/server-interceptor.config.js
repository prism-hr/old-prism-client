/** @ngInject */
export const serverInterceptorConfig = function ($provide, $httpProvider) {
    $provide.factory('serverInterceptor', ($q, $injector) => {
        return {
            request(config) {
                const authService = $injector.get('authService');
                const host = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
                if (config.url.startsWith(host)) {
                    config.headers['X-Auth-Token'] = authService.getTokenHeader();
                }
                return config;
            },
            responseError(rejection) {
                const status = rejection.status;
                if (status) {
                    if (status === 500 || status === 501 || status === 503 || status === 408) {
                        const alert = $injector.get('$mdToast');
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
};
