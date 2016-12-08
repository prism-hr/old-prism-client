import moment from 'moment';

class StudentEditQualificationController {
    /** @ngInject */
    constructor($state, $stateParams, definitions) {
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.definitions = definitions;

        this.refreshDateAwardConstraints = function () {
            this.minDateAward = this.dateStart && moment(this.dateStart).add(1, 'days').toDate();
            this.maxDateStart = moment().add(1, 'days').toDate();
        };
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

    organizationChanged(complete) {
        this.showSummary = complete;
    }

    dateStartChanged() {
        this.qualification.dateStart = moment(this.dateStart).format('YYYY-MM-DD');
        this.refreshDateAwardConstraints();
    }

    dateAwardChanged() {
        this.qualification.dateAward = moment(this.dateAward).format('YYYY-MM-DD');
    }
}

export const StudentEditQualification = {
    template: require('./student-edit-qualification.html'),
    bindings: {
        qualificationService: '<',
        wizardType: '<'
    },
    controller: StudentEditQualificationController
};
