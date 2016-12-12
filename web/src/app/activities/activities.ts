class ActivitiesController {
    activities: any;

    /** @ngInject */
    constructor(public Restangular: Restangular.IService) {
    }

    responseToActivity(activity: any, action: string) {
        this.Restangular.one('userActivities', activity.accessCode).customPUT({action: action})
            .then(() => {
                this.activities.splice(this.activities.indexOf(activity), 1);
            });
    }
}

export const Activities = {
    template: require('./activities.html'),
    bindings: {
        activities: '<'
    },
    controller: ActivitiesController
};
