class AdvertAudienceController {
    constructor(Restangular) {
        this.Restangular = Restangular;
    }

    $onInit() {
        this.advert.tags = this.advert.tags || [];
    }

    lookupTags(text) {
        return this.Restangular.all('tags').getList({searchTerm: text})
            .then(tags => tags.plain());
    }

    transformTag(chip) {
        if (angular.isObject(chip)) {
            return {tag: _.pick(chip, ['id', 'name'])};
        }
        return {tag: {name: chip}};
    }
}

export const AdvertAudience = {
    template: require('./advert-audience.html'),
    bindings: {
        advert: '=',
        form: '<'
    },
    controller: AdvertAudienceController
};
