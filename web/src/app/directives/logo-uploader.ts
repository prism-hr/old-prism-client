export class LogoUploader implements ng.IDirective {
    template = require('./logo-uploader.html');
    require = ['ngModel', '?^form'];
    restrict = 'E';
    scope = {
        readOnly: '@',
        dropArea: '@'
    };

    static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory =
            (cloudinary: any, environment: any) => new LogoUploader(cloudinary, environment);
        directive.$inject = ['cloudinary', 'environment'];
        return directive;
    }

    constructor(private cloudinary: any, private environment: any) {
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
                    const model = {cloudinaryId: response.data.public_id, cloudinaryUrl: response.data.url};
                    ngModel.$setViewValue(model);
                    scope.publicId = response.data.public_id;
                }, (response: any) => {
                    scope.progressPercentage = null;
                    scope.error = response.status;
                }, (event: any) => {
                    scope.progressPercentage = Math.round(100.0 * event.loaded / event.total);
                });
        };

        ngModel.$render = function () {
            scope.publicId = ngModel.$modelValue && ngModel.$modelValue.cloudinaryId;
        };
    }
}
