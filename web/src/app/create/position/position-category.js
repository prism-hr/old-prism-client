module.exports = {
    template: require('./position-category.html'),
    bindings: {
        position: '=',
        form: '<'
    },
    /** @ngInject */
    controller: function () {
        this.position.category = this.position.category || 'EMPLOYER';
    }
};
