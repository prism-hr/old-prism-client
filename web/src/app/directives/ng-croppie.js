import Croppie from 'croppie';

export class NgCroppie {
    /** @ngInject */
    constructor(cloudinary) {
        this.require = 'ngModel';
        this.restrict = 'E';
        this.scope = {
            srcUrl: '@',
            mimeType: '@'
        };
        this.cloudinary = cloudinary;
    }

    link(scope, element, attrs, ngModel) {
        const self = this;
        let croppie = null;
        const containerWidth = angular.element(document.body.querySelectorAll('.background-box'))[0].clientWidth;
        const options = {
            viewport: {width: containerWidth, height: 320},
            boundary: {width: containerWidth, height: 320}
        };

        options.update = function () {
            const format = scope.mimeType.replace('image/', '');
            croppie.result({type: 'blob', format: format})
                .then(result => {
                    ngModel.$setViewValue(result);
                });
        };
        croppie = new Croppie(element[0], options);

        scope.$watch('srcUrl', function (src) {
            if (src) {
                croppie.bind(src);
            }
        });
    }
}
