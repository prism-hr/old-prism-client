import * as _ from 'lodash';
import * as angular from 'angular';

class StudentSkillsController {
    private separatorKeys: any;

    /** @ngInject */
    constructor(private Restangular: Restangular.IService, private $mdConstant: any) {
        this.separatorKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
    }

    lookupTags(text: string) {
        return this.Restangular.all('tags').getList({searchTerm: text})
            .then((tags: Restangular.ICollection) => tags.plain());
    }

    transformTag(chip: any) {
        if (angular.isObject(chip)) {
            return {tag: _.pick(chip, ['id', 'name'])};
        }
        return {tag: {name: chip}};
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
