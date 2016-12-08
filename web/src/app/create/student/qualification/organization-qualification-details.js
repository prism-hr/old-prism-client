class OrganizationQualificationDetailsController {
    /** @ngInject */
    constructor(Restangular, definitions) {
        this.Restangular = Restangular;
        this.definitions = definitions;
    }

    $onInit() {

    }
}

export const OrganizationQualificationDetails = {
    template: `
        <md-input-container class="md-block program-input" flex>
            <label class="md-no-float">Program name</label>
            <input ng-model="$ctrl.qualification.name">
        </md-input-container>
    
        <label class="standalone-label">Study Level</label>
        <md-radio-group name="type" ng-required="true"
                        ng-model="$ctrl.qualification.category"
                        class="horizontal-form medium">
            <div class="radio-box-aligned">
                <md-radio-button ng-repeat="category in $ctrl.definitions.qualificationCategory"
                                 class="md-primary" value="{{category}}"
                                 aria-label="{{'definitions.qualificationCategory.' + category | translate}}">
                    {{'definitions.qualificationCategory.' + category | translate}}
                </md-radio-button>
            </div>
        </md-radio-group>`,
    bindings: {
        qualification: '='
    },
    controller: OrganizationQualificationDetailsController
};
