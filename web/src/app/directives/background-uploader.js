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
        const CLOUDINARY_REGEX = /^.+\.cloudinary\.com\/(?:[^\/]+\/)(?:(image|video)\/)?(?:(upload|fetch)\/)?(?:(?:[^_/]+_[^,/]+,?)*\/)?(?:v(\d+|\w{1,2})\/)?([^\.^\s]+)(?:\.(.+))?$/;
        scope.srcPublicId = 'local/jst7pa4karrnpzw0hd89';

        scope.fileChanged = function (file) {
            if (!file) {
                return;
            }
            self.cloudinary.upload(file, {folder: self.environment.cloudinaryFolder})
                .then(response => {
                    scope.progressPercentage = null;
                    scope.srcPublicId = getPublicId(response.data.url);
                }, response => {
                    scope.progressPercentage = null;
                    scope.error = response.status;
                }, event => {
                    scope.progressPercentage = Math.round(100.0 * event.loaded / event.total);
                });
        };

        ngModel.$render = function () {
            scope.publicId = ngModel.$modelValue && getPublicId(ngModel.$modelValue);
        };
        scope.cancel = function () {
            scope.srcPublicId = null;
            scope.croppedUrl = null;
        };

        scope.confirm = function () {
            scope.imageUrl = scope.data.croppedUrl;
        };

        function getPublicId(url) {
            const matches = CLOUDINARY_REGEX.exec(url);
            return matches[4];
        }
    }
}
