class AdvertSummaryController {
    private advert: any;
    private wizardType: string;
    private originalRecruiterState: any;
    private isRecruiter: boolean;

    $onInit() {
        const stepComplete = this.advert.stateComplete[this.wizardType].steps;
        stepComplete.recruiter = stepComplete.recruiter || 'invalid';
        this.originalRecruiterState = stepComplete.recruiter;
        if (this.originalRecruiterState === 'invalid') {
            this.isRecruiter = false;
        } else if (stepComplete.summary) { // this is already step editing
            this.isRecruiter = true;
        }
        this.advert.category = this.advert.category || 'EMPLOYMENT';
    }

    isRecruiterChanged(isRecruiter: boolean) {
        const stepComplete = this.advert.stateComplete[this.wizardType].steps;
        if (isRecruiter) {
            if (this.originalRecruiterState && this.originalRecruiterState !== 'invalid') {
                stepComplete.recruiter = this.originalRecruiterState;
            } else {
                delete stepComplete.recruiter;
            }
        } else {
            stepComplete.recruiter = 'invalid';
        }
    }
}

export const AdvertSummary = {
    template: require('./advert-summary.html'),
    bindings: {
        wizardType: '@',
        advert: '=',
        wizard: '<'
    },
    controller: AdvertSummaryController
};
