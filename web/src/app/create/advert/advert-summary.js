class AdvertSummaryController {
    $onInit() {
        this.advert.stateComplete = this.advert.stateComplete || {};
        this.originalRecruiterState = this.advert.stateComplete.recruiter;
        if (this.originalRecruiterState === 'invalid') {
            this.isRecruiter = false;
        } else if (this.advert.stateComplete.summary) { // this is already step editing
            this.isRecruiter = true;
        }
        this.advert.motivation = this.advert.motivation || 'EMPLOYER';
    }

    isRecruiterChanged(isRecruiter) {
        if (isRecruiter) {
            if (this.originalRecruiterState && this.originalRecruiterState !== 'invalid') {
                this.advert.stateComplete.recruiter = this.originalRecruiterState;
            } else {
                delete this.advert.stateComplete.recruiter;
            }
        } else {
            this.advert.stateComplete.recruiter = 'invalid';
        }
    }
}

export const AdvertSummary = {
    template: require('./advert-summary.html'),
    bindings: {
        advert: '=',
        form: '<'
    },
    controller: AdvertSummaryController
};
