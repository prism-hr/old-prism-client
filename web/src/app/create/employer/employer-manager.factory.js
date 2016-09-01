/** @ngInject */
module.exports = function ($q, Restangular, Upload) {
    var newEmployerManager = new EmployerManager();

    function EmployerManager(employer) {
        this._employer = employer || {};
    }

    EmployerManager.prototype.getEmployer = function () {
        return this._employer;
    };

    EmployerManager.prototype.saveEmployer = function (employer) {
        var url = Restangular.all('organizationImplementations').getRestangularUrl();
        var employerPost = angular.copy(employer);
        var logo = employerPost.documentLogoImage;
        employerPost.documentLogoImage = null;
        return Upload.upload({
            url: url,
            data: {
                data: Upload.json(employer),
                file: logo
            }
        }).then(function () {
            this._employer = {};
        });
    };

    return {
        getManager: function (id) {
            if (id === 'new') {
                return $q.when(newEmployerManager);
            }
            return Restangular.one('organizationImplementations', id).get()
                .then(function (employer) {
                    return new EmployerManager(employer);
                });
        }
    };
};
