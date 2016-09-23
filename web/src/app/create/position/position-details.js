module.exports = {
    template: require('./position-details.html'),
    bindings: {
        position: '=',
        form: '<'
    },
    /** @ngInject */
    controller: function () {
        this.position.positionType = this.position.positionType || 'EMPLOYMENT';
    }
};
