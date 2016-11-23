class StudentHeaderController {
    constructor($q, $state, Restangular, cloudinary, welcomeService, authService, userSessionService) {
        this.$q = $q;
        this.$state = $state;
        this.Restangular = Restangular;
        this.cloudinary = cloudinary;
        this.welcomeService = welcomeService;
        this.authService = authService;
        this.userSessionService = userSessionService;
    }

    $onInit() {
        this.showImplementationName = this.wizardType === 'student';
        this.student.email = this.student.email || this.authService.user.username;
    }
}

export const StudentHeader = {
    template: require('./student-header.html'),
    bindings: {
        welcomeType: '@',
        wizardType: '@',
        student: '=',
        form: '<'
    },
    controller: StudentHeaderController
};
