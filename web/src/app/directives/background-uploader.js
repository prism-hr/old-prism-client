export class BackgroundUploader {
    /** @ngInject */
    constructor(cloudinary, environment) {
        this.template = require('./background-uploader.html');
        this.require = 'ngModel';
        this.restrict = 'E';
        this.cloudinary = cloudinary;
        this.environment = environment;
    }

    link(scope, element, attrs, ngModel) {
        const self = this;
        scope.data = {};
        scope.publicId = 'local/jst7pa4karrnpzw0hd89';

        scope.fileChanged = function (file) {
            if (!file) {
                return;
            }
            self.cloudinary.upload(file, {folder: self.environment.cloudinaryFolder})
                .then(response => {
                    scope.progressPercentage = null;
                    scope.publicIdToCrop = response.data.public_id;
                }, response => {
                    scope.progressPercentage = null;
                    scope.error = response.status;
                }, event => {
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
