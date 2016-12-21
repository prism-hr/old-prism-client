import ContactRepresentation = bf.ContactRepresentation;
import * as _ from 'lodash';
import * as angular from 'angular';
import TaggableRepresentation = bf.TaggableRepresentation;
import TaggableReferrableRepresentation = bf.TaggableReferrableRepresentation;
import TagRelationRepresentation = bf.TagRelationRepresentation;

class SuggestedTagsController {
    view: ViewType;
    resource: TaggableReferrableRepresentation<any>;

    /** @ngInject */
    constructor(private Restangular: Restangular.IService) {
    }

    $onInit() {
        this.resource.tags = this.resource.tags || [];
    }

    lookupTags(text: string) {
        const exclusions = this.resource.tags.map((t: any) => t.tag.name);
        return this.Restangular.all('tags').getList({searchTerm: text, exclusions})
            .then((tags: Restangular.ICollection) => tags.plain());
    }

    transformTag(chip: any) {
        if (angular.isObject(chip)) {
            return {tag: _.pick(chip, ['accessCode', 'name'])};
        }
        return {tag: {name: chip}};
    }

    isTagSelected(tag: string) {
        return Boolean(this.resource.tags.find((t: any) => t.tag.name.toLowerCase() === tag.toLowerCase()));
    }

    selectTag(tag: string) {
        const idx = this.resource.tags.findIndex((t: any) => t.tag.name.toLowerCase() === tag.toLowerCase());
        if (idx > -1) {
            this.resource.tags.splice(idx, 1);
        } else {
            this.resource.tags.push(<TagRelationRepresentation>{tag: {name: tag}});
        }
        console.log(tag);
    }
}

export const SuggestedTags = {
    template: require('./suggested-tags.html'),
    bindings: {
        resource: '=',
        form: '<',
        label: '@'
    },
    controller: SuggestedTagsController
};

type ViewType = 'lookup' | 'details';
