import {IProfileEditRefereeService} from './profile-edit-referee-service';

class ProfileEditRefereeButtonsController {
    private refereeService: IProfileEditRefereeService;

    saveReferee() {
        this.refereeService.saveReferee();
    }

    cancelReferee() {
        this.refereeService.cancelReferee();
    }
}

export const ProfileEditRefereeButtons = {
    template: `
        <md-card-actions class="action-block" layout="row" layout-align="space-between none">
            <md-button class="md-primary big md-raised" ng-click="$ctrl.cancelReferee()">Cancel</md-button>
            <md-button class="md-primary big md-raised" ng-click="$ctrl.saveReferee()"
                       ng-disabled="$ctrl.wizard.form.$invalid">Save Referee
            </md-button>
        </md-card-actions>
    `,
    bindings: {
        refereeService: '<',
        wizard: '<'
    },
    controller: ProfileEditRefereeButtonsController
};
