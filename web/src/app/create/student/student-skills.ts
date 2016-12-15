import * as _ from 'lodash';
import * as angular from 'angular';
import UserRepresentation = bigfoot.UserRepresentation;

class StudentSkillsController {
    private separatorKeys: Array<string>;
    private student: UserRepresentation;

    /** @ngInject */
    constructor(private Restangular: Restangular.IService, private $mdConstant: any) {
        this.separatorKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
    }

    lookupTags(text: string) {
        const exclusions: Array<string> = this.student.tags.map(t => t.tag.name);
        return this.Restangular.all('tags').getList({searchTerm: text, exclusions})
            .then((tags: Restangular.ICollection) => tags.plain());
    }

    transformTag(chip: any) {
        if (angular.isObject(chip)) {
            return {tag: _.pick(chip, ['id', 'name'])};
        }
        return {tag: {name: chip}};
    }

    lookupInterests(text: string) {
        const exclusions: Array<string> = this.student.interests.map(t => t.interest.name);
        return this.Restangular.all('interests').getList({searchTerm: text, exclusions})
            .then((tags: Restangular.ICollection) => tags.plain());
    }

    transformInterest(chip: any) {
        if (angular.isObject(chip)) {
            return {interest: _.pick(chip, ['id', 'name'])};
        }
        return {interest: {name: chip}};
    }
}

export const StudentSkills = {
    template: require('./student-skills.html'),
    bindings: {
        student: '=',
        form: '<'
    },
    controller: StudentSkillsController
};
