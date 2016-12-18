import {IProfileEditExperienceService} from './profile-edit-experience-service';

class ProfileEditExperienceButtonsController {
    private experienceService: IProfileEditExperienceService;

    saveExperience() {
        this.experienceService.saveExperience();
    }

    cancelExperience() {
        this.experienceService.cancelExperience();
    }
}

export const ProfileEditExperienceButtons = {
    template: `
        <md-card-actions class="action-block" layout="row" layout-align="space-between none">
            <md-button class="md-primary big md-raised" ng-click="$ctrl.cancelExperience()">Cancel</md-button>
            <md-button class="md-primary big md-raised" ng-click="$ctrl.saveExperience()"
                       ng-disabled="$ctrl.wizard.form.$invalid">Save Experience
            </md-button>
        </md-card-actions>
    `,
    bindings: {
        experienceService: '<',
        wizard: '<'
    },
    controller: ProfileEditExperienceButtonsController
};
