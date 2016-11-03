class ActivitiesController {
    /** @ngInject */
    constructor(Restangular) {
        this.Restangular = Restangular;
    }

    responseToActivity(activity, action) {
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
