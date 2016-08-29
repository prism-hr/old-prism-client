module.exports = {
    template: require('./organization-address.html'),
    bindings: {
        type: '@',
        organization: '=',
        form: '<'
    },
    /** @ngInject */
    controller: function () {
        var self = this;

        this.addressSelected = function (address) {
            self.organization.location = address;
        };

    }
};
