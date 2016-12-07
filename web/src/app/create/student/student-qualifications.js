import moment from 'moment';

class StudentQualificationsController {
    /** @ngInject */
    constructor(definitions) {
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

        this.initializeQualification = function () {
            this.dateStart = this.editedQualification.dateStart && new Date(this.editedQualification.dateStart);
            this.dateAward = this.editedQualification.dateAward && new Date(this.editedQualification.dateAward);

            this.refreshDateAwardConstraints();
        };
    }

    editQualification(qualification) {
        this.editedQualification = angular.copy(qualification);
        this.initializeQualification();
    }

    addQualification() {
        this.editedQualification = {};
        this.initializeQualification();
    }

    saveQualification() {
        const qualifications = this.student.userQualifications;
        const idx = qualifications.findIndex(q => q.accessCode === this.editedQualification.accessCode);
        if (idx > -1) {
            qualifications.splice(idx, 1, this.editedQualification);
        } else {
            qualifications.push(this.editedQualification);
        }
        this.editedQualification = null;
    }

    cancelQualification() {
        this.editedQualification = null;
    }

    dateStartChanged() {
        this.editedQualification.dateStart = moment(this.dateStart).format('YYYY-MM-DD');
        this.refreshDateAwardConstraints();
    }

    dateAwardChanged() {
        this.editedQualification.dateAward = moment(this.dateAward).format('YYYY-MM-DD');
    }
}

export const StudentQualifications = {
    template: require('./student-qualifications.html'),
    bindings: {
        wizardType: '@',
        student: '=',
        form: '<'
    },
    controller: StudentQualificationsController
};
