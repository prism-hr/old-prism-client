/** @ngInject */
export class ActivityService {
    constructor(Restangular) {
        this.Restangular = Restangular;
    }

    getActivity(accessCode) {
        return this.Restangular.one('public').one('user').one('activities', accessCode).get();
    }

    loadOrganizations() {
        return this.Restangular.all('organizationImplementations').getList({context: 'PROMOTER'})
            .then(activities => activities.plain());
    }
}
