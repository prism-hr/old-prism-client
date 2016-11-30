class DepartmentWelcomeController {
    /** @ngInject */
    constructor(welcomeService) {
        this.welcomeService = welcomeService;
    }

    $onInit() {
        const welcomeType = 'department';
        this.statuses = this.welcomeService.getWelcomeStatuses('department');
        const department = _.get(this.statuses, 'department.resource');
        this.studentsEnabled = _.get(this.statuses, 'department.wizardComplete.state') === 'ACCEPTED';
        this.departmentWizardState = {
            name: 'manage.department.summary',
            params: {id: _.get(department, 'accessCode') || 'new', welcomeType}
        };
    }
}

export const DepartmentWelcome = {
    template: require('./department-welcome.html'),
    controller: DepartmentWelcomeController
};
