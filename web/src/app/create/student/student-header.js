class StudentHeaderController {
    constructor($q, $state, Restangular, cloudinary, welcomeService) {
        this.$q = $q;
        this.$state = $state;
        this.Restangular = Restangular;
        this.cloudinary = cloudinary;
        this.welcomeService = welcomeService;
    }
    $onInit() {
        this.showImplementationName = this.wizardType === 'student';
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
