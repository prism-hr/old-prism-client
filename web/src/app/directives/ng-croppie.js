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
        const croppie = new Croppie(element[0], {
            viewport: {width: containerWidth, height: 320},
            boundary: {width: containerWidth, height: 320}
        });

        scope.$watch('srcPublicId', function (src) {
            if (src) {
                croppie.bind(self.cloudinary.url(src));
            }
        });

        function updateModel() {
            const cropPoints = croppie.get();
        }
    }
}
