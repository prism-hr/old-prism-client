class DepartmentWelcomeController {
    /** @ngInject */
    constructor(welcomeService) {
        this.welcomeService = welcomeService;
    }

    $onInit() {
        this.statuses = this.welcomeService.getWelcomeStatuses('department');
        this.studentsEnabled = _.get(this.statuses.DEPARTMENT, 'resource.statusComplete.completed');
        this.employersEnabled = _.get(this.statuses.STUDENTS, 'resource.statusComplete.completed');
    }
}

export const DepartmentWelcome = {
    template: require('./department-welcome.html'),
    controller: DepartmentWelcomeController
};
