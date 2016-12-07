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
        this.student = this.wizard.getResource();
        this.qualification = angular.copy(this.pristineQualification);
        this.dateStart = this.qualification.dateStart && new Date(this.qualification.dateStart);
        this.dateAward = this.qualification.dateAward && new Date(this.qualification.dateAward);

        this.refreshDateAwardConstraints();
    }

    saveQualification() {
        const qualifications = this.student.userQualifications;
        const idx = qualifications.findIndex(q => q.accessCode === this.qualification.accessCode);
        if (idx > -1) {
            qualifications.splice(idx, 1, this.qualification);
        } else {
            qualifications.push(this.qualification);
        }
        this.goBack();
    }

    cancelQualification() {
        this.goBack();
    }

    goBack() {
        this.$state.go(this.$state.current.name.replace(/.edit$/, ''), _.omit(this.$stateParams, ['qualificationAccessCode']));
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
        pristineQualification: '=',
        wizard: '<',
        wizardType: '<'
    },
    controller: StudentEditQualificationController
};
