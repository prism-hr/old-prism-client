class StudentSkillsController {
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

export const StudentSkills = {
    template: require('./student-skills.html'),
    bindings: {
        student: '=',
        form: '<'
    },
    controller: StudentSkillsController
};
