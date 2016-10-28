/** @ngInject */
export class ActivityService {
    constructor(Restangular) {
        this.Restangular = Restangular;
    }

    getActivity(accessCode) {
        return this.Restangular.one('public').one('userActivities', accessCode).get();
    }

    loadOrganizations() {
        return this.Restangular.all('organizationImplementations').getList({context: 'PROMOTER'})
            .then(organizations => organizations.plain());
    }

    loadPromotions() {
        return this.Restangular.all('promotions').getList({category: 'EMPLOYMENT'})
            .then(promotions => promotions.plain());
    }
}
