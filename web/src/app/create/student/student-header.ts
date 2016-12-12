class StudentHeaderController {
    private student: any;
    private currentQualification: any;
    private showSummary: boolean;

    $onInit() {
        const qualifications = this.student.userQualifications;
        if (qualifications.length === 0) {
            qualifications.push({current: true});
        }
        this.currentQualification = qualifications.find(q => q.current);
        if (this.currentQualification.organizationImplementationQualification) {
            this.showSummary = true;
        }
    }

    organizationChanged(complete: boolean) {
        this.showSummary = complete;
    }
}

export const StudentHeader = {
    template: require('./student-header.html'),
    bindings: {
        wizardType: '@',
        student: '=',
        form: '<'
    },
    controller: StudentHeaderController
};
