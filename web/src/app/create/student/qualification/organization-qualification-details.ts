import * as _ from 'lodash';

class OrganizationQualificationDetailsController {
    private qualification: any;
    private selectedQualification: any;

    /** @ngInject */
    constructor(private Restangular: Restangular.IService, private definitions: any) {
    }

    $onInit() {
        this.selectedQualification = this.qualification.name && _.pick(this.qualification, ['accessCode', 'name']);
    }

    qualificationSelected(qualification: any) {
        qualification = qualification || {}; // if nothing selected
        this.qualification.accessCode = qualification.accessCode;
        this.qualification.name = qualification.name;
        this.qualification.category = qualification.category;
    }

    getQualifications(searchText: string) {
        const organizationAccessCode = this.qualification.organizationImplementation.accessCode;
        return this.Restangular.one('organizationImplementations', organizationAccessCode)
            .all('qualifications').getList({searchTerm: searchText})
            .then((qualifications: Restangular.ICollection) => {
                qualifications = qualifications.plain();
                const nameTaken = _.find(qualifications, {name: searchText});
                if (searchText.length >= 2 && !nameTaken) {
                    qualifications.unshift({name: searchText});
                }
                return qualifications;
            });
    }
}

export const OrganizationQualificationDetails = {
    template: `
        <md-autocomplete
                md-input-name="selectedQualification"
                md-no-cache="true"
                md-selected-item="$ctrl.selectedQualification"
                md-selected-item-change="$ctrl.qualificationSelected(qualification)"
                ng-model-options="{debounce: 600}"
                md-search-text="qualificationSearchText"
                md-items="qualification in $ctrl.getQualifications(qualificationSearchText)"
                md-item-text="qualification.name"
                md-min-length="1"
                md-autoselect="true"
                placeholder="Lookup your qualification"
                md-menu-class="autocomplete-custom-template"
                md-require-match
                required>
            <md-item-template>
                <div layout="row">
                    <span md-highlight-text="searchText">
                        {{qualification.accessCode ? qualification.name : 'Create ' + qualification.name}}
                    </span>
                </div>
            </md-item-template>
        </md-autocomplete>

        <div ng-if="!$ctrl.qualification.accessCode">
            <label class="standalone-label">Study Level</label>
            <md-radio-group name="type" ng-required="true"
                            ng-model="$ctrl.qualification.category"
                            class="horizontal-form medium"
                            required>
                <div class="radio-box-aligned">
                    <md-radio-button ng-repeat="category in $ctrl.definitions.qualificationCategory"
                                     class="md-primary" value="{{category}}"
                                     aria-label="{{'definitions.qualificationCategory.' + category | translate}}">
                        {{'definitions.qualificationCategory.' + category | translate}}
                    </md-radio-button>
                </div>
            </md-radio-group>
        </div>`,
    bindings: {
        qualification: '='
    },
    controller: OrganizationQualificationDetailsController
};
