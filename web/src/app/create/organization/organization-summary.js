module.exports = {
    template: require('./organization-summary.html'),
    bindings: {
        type: '@',
        organization: '=',
        form: '<'
    },
    /** @ngInject */
    controller: function (Restangular) {
        this.lookupTags = function (text) {
            return Restangular.all('tags').getList({searchTerm: text})
                .then(function (tags) {
                    return tags.plain();
                });
        };

        this.transformTag = function (chip) {
            if (angular.isObject(chip)) {
                return {tag: _.pick(chip, ['id', 'name'])};
            }
            return {tag: {name: chip}};
        };
    }
};
