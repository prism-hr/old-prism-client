function ActivationService(Restangular) {
    this.Restangular = Restangular;
}

ActivationService.prototype = {
    getActivity: function (accessCode) {
        return this.Restangular.one('public').one('user').one('activities', accessCode).get();
    }
};

module.exports = ActivationService;
