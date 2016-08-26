module.exports = {
    templateUrl: 'app/create/organization/organization-address.html',
    bindings: {
        type: '@',
        organization: '=',
        form: '<'
    },
    /** @ngInject */
    controller: function () {
        var self = this;

        this.lookupAddress = function () {
            self.address = null;
            self.foundAddress = null;
        };

        this.addressSelected = function (address) {
            if (!address) {
                return;
            }
            if (address.id) {
                self.selectedAddress = address;
            } else {
                self.address = address;
            }
        };

        this.confirmSelectedAddress = function (confirm) {
            if (confirm) {
                self.address = self.selectedAddress;
            }
            self.selectedAddress = null;
            self.foundAddress = null;
        };
    }
};
