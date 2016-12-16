import {IProfileEditQualificationService} from './profile-edit-qualification-service';

class ProfileEditQualificationButtonsController {
    private qualificationService: IProfileEditQualificationService;

    saveQualification() {
        this.qualificationService.saveQualification();
    }

    cancelQualification() {
        this.qualificationService.cancelQualification();
    }
}

export const ProfileEditQualificationButtons = {
    template: require('./profile-edit-qualification-buttons.html'),
    bindings: {
        qualificationService: '<',
        wizard: '<'
    },
    controller: ProfileEditQualificationButtonsController
};
