/** @ngInject */
function ActivationService(Restangular) {
    this.Restangular = Restangular;
}

ActivationService.prototype = {
    getActivity: function (accessCode) {
        return this.Restangular.one('public').one('user').one('activities', accessCode).get();
    },

    putActivity: function (accessCode, activity) {
        return this.Restangular.one('public').one('user').one('activities', accessCode).customPUT(activity);
    }
};

module.exports = ActivationService;

