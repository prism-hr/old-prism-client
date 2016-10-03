/** @ngInject */
export class ActivationService {
    constructor(Restangular) {
        this.Restangular = Restangular;
    }

    getActivity(accessCode) {
        return this.Restangular.one('public').one('user').one('activities', accessCode).get();
    }
}
