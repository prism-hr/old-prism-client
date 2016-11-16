/** @ngInject */
export class ActivityService {
    constructor(Restangular) {
        this.Restangular = Restangular;
        this._activitiesSubject = new Rx.Subject();
    }

    getActivity(accessCode) {
        return this.Restangular.one('public').one('userActivities', accessCode).get();
    }

    loadOrganizations() {
        return this.Restangular.all('organizationImplementations').getList({context: 'promoter'})
            .then(organizations => {
                this.organizations = organizations.plain();
                this._activitiesSubject.onNext({organizations: this.organizations});
            });
    }

    loadPromotions() {
        return this.Restangular.all('promotions').getList({category: 'EMPLOYMENT'})
            .then(promotions => {
                this.promotions = promotions.plain();
                this._activitiesSubject.onNext({promotions: this.promotions});
            });
    }

    subscribeToActivities(observer) {
        return this._activitiesSubject.subscribe(observer);
    }
}
