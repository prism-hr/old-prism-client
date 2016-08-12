/** @ngInject */
function activationService(Restangular) {
    this.Restangular = Restangular;
}

activationService.prototype = {
    getActivity: function (accessCode) {
        return this.Restangular.one('public').one('user').one('activities', accessCode).get();
    },

    putActivity: function (accessCode, activity) {
        return this.Restangular.one('public').one('user').one('activities', accessCode).customPUT(activity);
    }
};

module.exports = activationService;

