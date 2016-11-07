import Croppie from 'croppie';

export class NgCroppie {
    /** @ngInject */
    constructor(cloudinary) {
        this.require = 'ngModel';
        this.restrict = 'E';
        this.scope = {
            srcPublicId: '@'
        };
        this.cloudinary = cloudinary;
    }

    link(scope, element, attrs, ngModel) {
        const self = this;
        const containerWidth = angular.element(document.body.querySelectorAll('.background-box'))[0].clientWidth;
        const options = {
            viewport: {width: containerWidth, height: 320},
            boundary: {width: containerWidth, height: 320}
        };

        options.update = function (result, b, c) {
            const cropPoints = result.points;
            const x = cropPoints[0];
            const y = cropPoints[1];
            const width = cropPoints[2] - x;
            const height = cropPoints[3] - y;
            const crop = 'crop';
            ngModel.$setViewValue(self.cloudinary.url(scope.srcPublicId, {x, y, width, height, crop}));
        };
        const croppie = new Croppie(element[0], options);

        scope.$watch('srcPublicId', function (src) {
            if (src) {
                croppie.bind(self.cloudinary.url(src));
            }
        });
    }
}
