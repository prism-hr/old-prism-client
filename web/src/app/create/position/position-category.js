module.exports = {
    template: require('./position-category.html'),
    bindings: {
        position: '=',
        form: '<'
    },
    /** @ngInject */
    controller: function () {
        this.position.type = this.position.type || 'POSITION';
        this.position.category = this.position.category || 'EMPLOYER';
    }
};
