export class LogoUploader {
    /** @ngInject */
    constructor(cloudinary, environment) {
        this.template = require('./logo-uploader.html');
        this.require = ['ngModel', '?^form'];
        this.restrict = 'E';
        this.scope = {
            readOnly: '@',
            dropArea: '@'
        };
        this.cloudinary = cloudinary;
        this.environment = environment;
    }

    link(scope, element, attrs, ctrl) {
        const self = this;
        const ngModel = ctrl[0];

        scope.fileChanged = function (file) {
            if (!file) {
                return;
            }
            self.cloudinary.upload(file, {folder: self.environment.cloudinaryFolder})
                .then(response => {
                    scope.progressPercentage = null;
                    const model = {cloudinaryId: response.data.public_id, cloudinaryUrl: response.data.url};
                    ngModel.$setViewValue(model);
                    scope.publicId = response.data.public_id;
                }, response => {
                    scope.progressPercentage = null;
                    scope.error = response.status;
                }, event => {
                    scope.progressPercentage = Math.round(100.0 * event.loaded / event.total);
                });
        };

        ngModel.$render = function () {
            scope.publicId = ngModel.$modelValue && ngModel.$modelValue.cloudinaryId;
        };
    }
}
