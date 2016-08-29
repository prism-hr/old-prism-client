module.exports = {
    template: require('./organization-summary.html'),
    bindings: {
        type: '@',
        organization: '=',
        form: '<'
    },
    /** @ngInject */
    controller: function () {
    }
};
