module.exports = {
    template: require('./organization-assets.html'),
    bindings: {
        type: '@',
        organizationFiles: '=',
        form: '<'
    },
    /** @ngInject */
    controller: function () {

    }
};
