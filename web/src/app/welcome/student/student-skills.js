class StudentSkillsController {
}

export const StudentSkills = {
    template: require('./student-skills.html'),
    bindings: {
        student: '=',
        form: '<'
    },
    controller: StudentSkillsController
};
