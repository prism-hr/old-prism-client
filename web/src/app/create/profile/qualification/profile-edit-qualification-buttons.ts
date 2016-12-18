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
    template: `
        <md-card-actions class="action-block" layout="row" layout-align="space-between none">
            <md-button class="md-primary big md-raised" ng-click="$ctrl.cancelQualification()">Cancel</md-button>
            <md-button class="md-primary big md-raised" ng-click="$ctrl.saveQualification()"
                       ng-disabled="$ctrl.wizard.form.$invalid">Save Qualification
            </md-button>
        </md-card-actions>
    `,
    bindings: {
        qualificationService: '<',
        wizard: '<'
    },
    controller: ProfileEditQualificationButtonsController
};
