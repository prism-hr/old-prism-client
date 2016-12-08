import moment from 'moment';

class StudentEditQualificationController {
    /** @ngInject */
    constructor($state, $stateParams, definitions) {
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.definitions = definitions;

        this.refreshDateAwardConstraints = function () {
            this.minDateAward = this.dateStart && new Date(
                    this.dateStart.getFullYear(),
                    this.dateStart.getMonth(),
                    this.dateStart.getDate() + 1);
            this.maxDateStart = this.dateStart && new Date(
                    this.dateStart.getFullYear(),
                    this.dateStart.getMonth(),
                    this.dateStart.getDate());
        };
    }

    $onInit() {
        this.qualification = this.qualificationService.getQualification();
        this.dateStart = this.qualification.dateStart && new Date(this.qualification.dateStart);
        this.dateAward = this.qualification.dateAward && new Date(this.qualification.dateAward);

        this.refreshDateAwardConstraints();
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
