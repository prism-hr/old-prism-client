import {IEnvironmentConfiguration} from '../../env';

export class DocumentUploader implements ng.IDirective {
    template = `
        <div ng-model="chosenFile"
             ngf-pattern="'application/pdf'"
             ngf-accept="'application/pdf'"
             ngf-max-size="5MB"
             ngf-change="fileChanged($file)"
             ngf-select
             ngf-drop
             layout="row" layout-align="start start">
            <md-button class="md-button md-raised md-warn small-xs">Upload</md-button>
        </div>
        <a ng-if="publicId" href="http://res.cloudinary.com/bitfoot/image/upload/{{publicId}}" target="_blank">
            Uploaded: {{fileName}}
        </a>
    `;
    require = ['ngModel', '?^form'];
    restrict = 'E';

    static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory =
            (cloudinary: any, environment: IEnvironmentConfiguration) => new DocumentUploader(cloudinary, environment);
        directive.$inject = ['cloudinary', 'environment'];
        return directive;
    }

    constructor(private cloudinary: any, private environment: IEnvironmentConfiguration) {
    }

    link(scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: Array<any>) {
        const self = this;
        const ngModel: ng.INgModelController = ctrl[0];

        scope.fileChanged = function (file: any) {
            if (!file) {
                return;
            }
            self.cloudinary.upload(file, {folder: self.environment.cloudinaryFolder})
                .then((response: any) => {
                    scope.progressPercentage = null;
                    const model = {
                        cloudinaryId: response.data.public_id,
                        cloudinaryUrl: response.data.url,
                        fileName: response.data.original_filename + '.' + response.data.format
                    };
                    ngModel.$setViewValue(model);
                    scope.publicId = model.cloudinaryId;
                    scope.fileName = model.fileName;
                }, (response: any) => {
                    scope.progressPercentage = null;
                    scope.error = response.status;
                }, (event: ng.angularFileUpload.IFileProgressEvent) => {
                    scope.progressPercentage = Math.round(100.0 * event.loaded / event.total);
                });
        };

        ngModel.$render = function () {
            scope.publicId = ngModel.$modelValue && ngModel.$modelValue.cloudinaryId;
            scope.fileName = ngModel.$modelValue && ngModel.$modelValue.fileName;
        };
    }
}
