import * as moment from 'moment';
import {IProfileEditQualificationService} from './profile-edit-qualification-service';
import UserQualificationRepresentation = bf.UserQualificationRepresentation;

class ProfileEditQualificationController {
    private qualificationService: IProfileEditQualificationService;
    private qualification: UserQualificationRepresentation;
    private dateStart: Date;
    private dateAward: Date;
    private showSummary: boolean;
    private minDateAward: Date;
    private maxDateStart: Date;

    /** @ngInject */
    constructor(private $state: ng.ui.IStateService, private $stateParams: any, private definitions: any) {
    }

    $onInit() {
        this.qualification = this.qualificationService.getQualification();
        this.dateStart = this.qualification.dateStart && new Date(this.qualification.dateStart);
        this.dateAward = this.qualification.dateAward && new Date(this.qualification.dateAward);
        if (this.qualification.organizationImplementationQualification) {
            this.showSummary = true;
        }

        this.refreshDateAwardConstraints();
    }

    organizationChanged(complete: true) {
        this.showSummary = complete;
    }

    dateStartChanged() {
        this.qualification.dateStart = moment(this.dateStart).format('YYYY-MM-DD');
        this.refreshDateAwardConstraints();
    }

    dateAwardChanged() {
        this.qualification.dateAward = moment(this.dateAward).format('YYYY-MM-DD');
    }

    private refreshDateAwardConstraints() {
        this.minDateAward = this.dateStart && moment(this.dateStart).add(1, 'days').toDate();
        this.maxDateStart = moment().add(1, 'days').toDate();
    }
}

export const ProfileEditQualification = {
    template: require('./profile-edit-qualification.html'),
    bindings: {
        qualificationService: '<',
        wizardType: '<',
        wizard: '<'
    },
    controller: ProfileEditQualificationController
};
