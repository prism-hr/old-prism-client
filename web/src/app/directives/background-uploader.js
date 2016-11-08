export class BackgroundUploader {
    /** @ngInject */
    constructor(UploadDataUrl, cloudinary, environment) {
        this.template = require('./background-uploader.html');
        this.require = 'ngModel';
        this.restrict = 'E';
        this.UploadDataUrl = UploadDataUrl;
        this.cloudinary = cloudinary;
        this.environment = environment;
    }

    link(scope, element, attrs, ngModel) {
        const self = this;
        scope.data = {};
        const CLOUDINARY_REGEX = /^.+\.cloudinary\.com\/(?:[^\/]+\/)(?:(image|video)\/)?(?:(upload|fetch)\/)?(?:(?:[^_/]+_[^,/]+,?)*\/)?(?:v(\d+|\w{1,2})\/)?([^\.^\s]+)(?:\.(.+))?$/;

        scope.fileChanged = function (file) {
            scope.mimeType = file.type;
            self.UploadDataUrl.dataUrl(file)
                .then(function (url) {
                    scope.srcUrl = url;
                });
        };

        ngModel.$render = function () {
            scope.publicId = ngModel.$modelValue && getPublicId(ngModel.$modelValue);
        };

        scope.cancel = function () {
            scope.srcUrl = null;
            scope.data.croppedUrl = null;
        };

        scope.confirm = function () {
            self.cloudinary.upload(scope.data.croppedImage, {folder: self.environment.cloudinaryFolder})
                .then(response => {
                    scope.progressPercentage = null;
                    scope.srcUrl = null;
                    scope.data.croppedUrl = null;
                    ngModel.$setViewValue(response.data.url);
                    scope.publicId = getPublicId(response.data.url);
                }, response => {
                    scope.progressPercentage = null;
                    scope.error = response.status;
                }, event => {
                    scope.progressPercentage = Math.round(100.0 * event.loaded / event.total);
                });
        };

        function getPublicId(url) {
            const matches = CLOUDINARY_REGEX.exec(url);
            return matches[4];
        }
    }
}
