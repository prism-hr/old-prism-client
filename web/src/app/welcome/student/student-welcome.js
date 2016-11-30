class StudentWelcomeController {
    /** @ngInject */
    constructor(welcomeService) {
        this.welcomeService = welcomeService;
    }

    $onInit() {
        const welcomeType = 'student';
        this.statuses = this.welcomeService.getWelcomeStatuses('student');
        const student = _.get(this.statuses, 'student.resource');
        this.profileEnabled = _.get(this.statuses.student, 'resource.statusComplete.completed');
        this.studentWizardState = {
            name: 'manage.student.header',
            params: {id: _.get(student, 'accessCode') || 'new', welcomeType}
        };
        this.profileWizardState = {
            name: 'manage.profile.dupa',
            params: {id: _.get(student, 'accessCode') || 'new', welcomeType}
        };
    }
}

export const StudentWelcome = {
    template: require('./student-welcome.html'),
    controller: StudentWelcomeController
};
