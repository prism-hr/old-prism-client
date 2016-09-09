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
        var url;
        if (employer.id) {
            url = Restangular.one('organizationImplementations', employer.id).getRestangularUrl();
        } else {
            url = Restangular.all('organizationImplementations').getRestangularUrl();
        }
        var employerPost = angular.copy(_.omit(employer, ['state', 'userCreate']));
        var logo = employerPost.documentLogoImage;
        employerPost.documentLogoImage = null;
        return Upload.upload({
            url: url,
            data: {
                data: Upload.json(employerPost),
                file: logo
            }
        }).then(function (response) {
            this._employer = {};
            return response;
        });
    };

    return {
        getManager: function (id) {
            if (id === 'new') {
                return $q.when(newEmployerManager);
            }
            return Restangular.one('organizationImplementations', id).get()
                .then(function (employer) {
                    return new EmployerManager(employer.plain());
                });
        }
    };
};
