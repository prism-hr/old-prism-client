import * as _ from 'lodash';
import {WelcomeService} from '../../welcome/welcome.service';
import OrganizationImplementationRepresentation = bf.OrganizationImplementationRepresentation;

class OrganizationSummaryController {
    private wizard: any;
    private welcomeType: string;
    private organization: any;
    private showDescription: boolean;
    private editingMode: boolean;
    private showSummary: boolean;
    private editableName: string;
    private showDepartment: boolean;
    private wizardType: string;
    private requestAccess: boolean;
    private showRequestAccess: boolean;

    /** @ngInject */
    constructor(private $q: ng.IQService, private $state: any, private Restangular: Restangular.IService, private rx: any, private cloudinary: any, private welcomeService: WelcomeService) {
    }

    $onInit() {
        if (this.organization.description) {
            this.showDescription = true;
        }
        if (this.organization.accessCode) {
            this.editingMode = true;
            this.showSummary = true;
            if (this.organization.name === this.organization.organization.name) {
                this.editableName = 'ORGANIZATION';
            } else {
                this.showDepartment = true;
                this.editableName = 'IMPLEMENTATION';
            }
        }
        this.wizard.registerCustomNextHandler(this._onNext.bind(this));

        this.rx.createObservableFunction(this, 'organizationNameChanged')
            .debounce(250)
            .distinctUntilChanged(args => args[0])
            .flatMapLatest(([searchTerm, fieldName]: [string, string]) => {
                this.wizard.form.$setValidity('organizationNameCheck', false, null);
                return this.Restangular.all('organizationImplementations').getList({
                    context: this.wizardType,
                    searchTerm: searchTerm
                })
                    .then((organizations: Restangular.ICollection) => {
                        this.wizard.form.$setValidity('organizationNameCheck', true, null);
                        return [searchTerm, fieldName, organizations.plain()];
                    });
            })
            .subscribe(([searchTerm, fieldName, organizations]: [string, string, Array<OrganizationImplementationRepresentation>]) => {
                const name = searchTerm;
                const organization = organizations.find(o => o.name === name);
                const nameTaken = !organization || organization.accessCode === this.organization.accessCode;
                this.wizard.form[fieldName].$setValidity('nameTaken', nameTaken);
            });
    }

    $onDestroy() {
        this.wizard.registerCustomNextHandler(null);
    }

    _onNext() {
        if (!this.editingMode && this.organization.accessCode) {
            if (this.requestAccess) {
                const accessCode = this.organization.organizationImplementationAccessCode || this.organization.accessCode;
                this.Restangular.one('organizationImplementations', accessCode).one('join').customPUT({})
                    .then(() => {
                        if (this.welcomeType) {
                            return this.$state.go('view.' + this.wizardType, {accessCode: accessCode});
                        }
                        return this.$state.go('activities');
                    });
            } else {
                this.$state.reload();
            }
            return 'handled';
        }
    }

    organizationChanged(complete: boolean) {
        this.requestAccess = null;
        this.showRequestAccess = complete && this.organization.accessCode;
        this.organization.documentLogoImage = this.organization.documentLogoImage || _.get(this.organization, 'organization.documentLogoImage');
        this.showSummary = complete && !this.showRequestAccess;
    }
}

export const OrganizationSummary = {
    template: require('./organization-summary.html'),
    bindings: {
        welcomeType: '@',
        wizardType: '@',
        organization: '=',
        wizard: '<'
    },
    controller: OrganizationSummaryController
};
