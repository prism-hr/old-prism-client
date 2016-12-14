import {IEnvironmentConfiguration} from '../../env';
export class BackgroundUploader implements ng.IDirective {
    template = require('./background-uploader.html');
    require = 'ngModel';
    restrict = 'E';
    scope = {
        readOnly: '@'
    };

    static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory =
            (cloudinary: any, environment: IEnvironmentConfiguration) => new BackgroundUploader(cloudinary, environment);
        directive.$inject = ['cloudinary', 'environment'];
        return directive;
    }

    constructor(private cloudinary: any, private environment: IEnvironmentConfiguration) {
    }

    link(scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModel: ng.INgModelController) {
        const self = this;
        scope.data = {};
        scope.publicId = 'local/jst7pa4karrnpzw0hd89';

        scope.fileChanged = function (file: any) {
            if (!file) {
                return;
            }
            self.cloudinary.upload(file, {folder: self.environment.cloudinaryFolder})
                .then((response: any) => {
                    scope.progressPercentage = null;
                    scope.publicIdToCrop = response.data.public_id;
                }, (response: any) => {
                    scope.progressPercentage = null;
                    scope.error = response.status;
                }, (event: ng.angularFileUpload.IFileProgressEvent) => {
                    scope.progressPercentage = Math.round(100.0 * event.loaded / event.total);
                });
        };

        ngModel.$render = function () {
            if (ngModel.$modelValue) {
                scope.imageUrl = ngModel.$modelValue.cloudinaryUrl;
                scope.publicId = ngModel.$modelValue.cloudinaryId;
            } else {
                scope.imageUrl = null;
                scope.publicId = null;
            }
        };

        scope.edit = function () {
            scope.publicIdToCrop = ngModel.$modelValue.cloudinaryId;
        };

        scope.cancel = function () {
            scope.publicIdToCrop = null;
            scope.data.croppedUrl = null;
        };

        scope.confirm = function () {
            scope.imageUrl = scope.data.croppedUrl;
            ngModel.$setViewValue({cloudinaryId: scope.publicIdToCrop, cloudinaryUrl: scope.imageUrl});
            scope.publicIdToCrop = null;
            scope.data.croppedUrl = null;
        };
    }
}
