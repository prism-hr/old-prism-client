import * as _ from 'lodash';
import {WelcomeService} from '../welcome.service';
class StudentWelcomeController {
    statuses: any;
    profileEnabled: boolean;
    studentWizardState: any;
    profileWizardState: any;

    /** @ngInject */
    constructor(private welcomeService: WelcomeService) {
    }

    $onInit() {
        const welcomeType = 'student';
        this.statuses = this.welcomeService.getWelcomeStatuses('student');
        const student = _.get(this.statuses, 'student.resource');
        this.profileEnabled = _.get(this.statuses, 'student.wizardComplete.state') === 'COMPLETE';
        this.studentWizardState = {
            name: 'manage.student.header',
            params: {id: _.get(student, 'accessCode') || 'new', welcomeType}
        };
        this.profileWizardState = {
            name: 'manage.profile.qualifications',
            params: {id: _.get(student, 'accessCode') || 'new', welcomeType}
        };
    }
}

export const StudentWelcome = {
    template: require('./student-welcome.html'),
    controller: StudentWelcomeController
};
