import UserRepresentation = bf.UserRepresentation;
import UserExperienceRepresentation = bf.UserExperienceRepresentation;

class ProfileExperiencesController {
    private student: UserRepresentation;
    private wizard: any;
    /** @ngInject */
    constructor(private $state: ng.ui.IStateService) {
    }

    getExperienceHref(experience: UserExperienceRepresentation) {
        return this.$state.href(this.$state.current.name + '.edit', {experienceAccessCode: experience ? experience.accessCode : 'new'});
    }

    deleteExperience(experience: UserExperienceRepresentation) {
        const idx = this.student.userExperiences.indexOf(experience);
        this.student.userExperiences.splice(idx, 1);
        this.wizard.persist();
    }
}

export const ProfileExperiences = {
    template: require('./profile-experiences.html'),
    bindings: {
        student: '=',
        wizard: '<'
    },
    controller: ProfileExperiencesController
};
