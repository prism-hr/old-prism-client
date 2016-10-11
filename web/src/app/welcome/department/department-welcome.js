class DepartmentWelcomeController {
    /** @ngInject */
    constructor(welcomeService) {
        this.welcomeService = welcomeService;
    }

    $onInit() {
        const welcomeType = 'department';
        this.statuses = this.welcomeService.getWelcomeStatuses('department');
        const department = _.get(this.statuses, 'DEPARTMENT.resource');
        this.studentsEnabled = _.get(department, 'statusComplete.completed');
        this.employersEnabled = _.get(this.statuses.STUDENTS, 'resource.statusComplete.completed');
        this.departmentWizardState = {
            name: 'department.summary',
            params: {id: _.get(department, 'accessCode') || 'new', welcomeType}
        };
    }
}

export const DepartmentWelcome = {
    template: require('./department-welcome.html'),
    controller: DepartmentWelcomeController
};
