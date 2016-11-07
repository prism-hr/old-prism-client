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
        const croppie = new Croppie(element[0]);

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
