class AudienceSummaryController {
    constructor(definitions) {
        this.definitions = definitions;
    }
    $onInit() {
        this.patternValues = this.definitions.studentPattern;
    }
    // togglePattern(pattern) {
    //     const idx = this.audience.studentPattern.findIndex(p => p.positionWorkPattern === pattern);
    //     if (idx > -1) {
    //         this.audience.studentPattern.splice(idx, 1);
    //     } else {
    //         this.audience.studentPattern.push({positionWorkPattern: pattern});
    //     }
    // }
    //
    // isPatternChecked(pattern) {
    //     return this.audience.studentPattern.find(p => p.positionWorkPattern === pattern);
    // }
    //
    // anyPatternChecked() {
    //     return (this.audience.studentPattern.length !== 0 &&
    //     this.audience.studentPattern.length !== this.patternValues.length);
    // }
    //
    // allPatternsChecked() {
    //     return this.audience.studentPattern.length === this.patternValues.length;
    // }
    //
    // toggleAllPatterns() {
    //     if (this.audience.studentPattern.length === this.patternValues.length) {
    //         this.audience.studentPattern = [];
    //     } else if (this.audience.studentPattern.length === 0 || this.audience.studentPattern.length > 0) {
    //         this.audience.studentPattern = this.patternValues.map(p => ({positionWorkPattern: p}));
    //     }
    // }
}

export const AudienceSummary = {
    template: require('./audience-summary.html'),
    bindings: {
        audience: '=',
        form: '<'
    },
    controller: AudienceSummaryController
};
