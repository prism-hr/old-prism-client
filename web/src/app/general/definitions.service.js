/** @ngInject */
function DefinitionsService(Restangular) {
    this.Restangular = Restangular;
}

DefinitionsService.prototype = {
    loadDefinitions: function () {
        var self = this;
        if (!self.loadPromise) {
            self.loadPromise = this.Restangular.one('public', 'definitions').get()
                .then(function (definitions) {
                    _.assign(self, definitions.plain());
                    return definitions.plain();
                });
        }
        return self.loadPromise;
    }
};

module.exports = DefinitionsService;
