module.exports = {
    template: require('./position-details.html'),
    bindings: {
        position: '=',
        form: '<'
    },
    /** @ngInject */
    controller: function () {
        this.position.type = this.position.type || 'POSITION';
    }
};
