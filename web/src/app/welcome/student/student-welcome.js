class StudentWelcomeController {
    /** @ngInject */
    constructor(welcomeService) {
        this.welcomeService = welcomeService;
    }

    $onInit() {
        this.statuses = this.welcomeService.getWelcomeStatuses('student');
        this.profileEnabled = _.get(this.statuses.STUDENT, 'resource.statusComplete.completed');
    }
}

export const StudentWelcome = {
    template: require('./student-welcome.html'),
    controller: StudentWelcomeController
};
