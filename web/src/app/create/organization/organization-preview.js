module.exports = {
    template: require('./organization-preview.html'),
    bindings: {
        type: '@',
        organization: '=',
        form: '<'
    },
    /** @ngInject */
    controller: function () {
    }
};
