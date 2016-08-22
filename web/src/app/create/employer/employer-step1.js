module.exports = {
    templateUrl: 'app/create/employer/employer-step1.html',
    controller: function () {
        var self = this;
        this.cannotFindCompany = function (bolean) {
            self.notFoundCompany = bolean;
        };
    }
};
