/** @ngInject */
export const StudentEditQualificationService = function ($state, $stateParams) {
    class QualificationService {
        constructor(resource, qualificationAccessCode) {
            this._resource = resource;
            const originalQualification = this._resource.userQualifications.find(q => q.accessCode === qualificationAccessCode);
            this._qualification = angular.copy(originalQualification) || {};
        }

        getQualification() {
            return this._qualification;
        }

        saveQualification() {
            const qualifications = this._resource.userQualifications;
            const idx = qualifications.findIndex(q => q.accessCode === this._qualification.accessCode);
            if (idx > -1) {
                qualifications.splice(idx, 1, this._qualification);
            } else {
                qualifications.push(this._qualification);
            }
            this.goBack();
        }

        cancelQualification() {
            this.goBack();
        }

        goBack() {
            $state.go($state.current.name.replace(/.edit$/, ''), _.omit($stateParams, ['qualificationAccessCode']));
        }
    }

    return {
        create(resource, qualificationAccessCode) {
            return new QualificationService(resource, qualificationAccessCode);
        }
    };
};
