import {AuthService} from '../unauthenticated/auth.service';

/** @ngInject */
export const serverInterceptorConfig = function ($provide: any, $httpProvider: ng.IHttpProvider) {
    $provide.factory('serverInterceptor', ($q, $injector) => {
        return {
            request(config: ng.IRequestConfig) {
                const authService: AuthService = $injector.get('authService');
                const host = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
                if (config.url.startsWith(host)) {
                    config.headers['X-Auth-Token'] = authService.getTokenHeader();
                } else {
                    delete (config.headers as any).Authorization;
                }
                return config;
            },
            responseError(rejection: any) {
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
