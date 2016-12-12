import * as angular from 'angular';
import Croppie from 'croppie';

export class NgCroppie implements ng.IDirective {
    require = 'ngModel';
    restrict = 'E';
    scope = {
        publicId: '@'
    };

    static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory =
            (cloudinary: any) => new NgCroppie(cloudinary);
        directive.$inject = ['cloudinary'];
        return directive;
    }

    constructor(private cloudinary: any) {
        this.cloudinary = cloudinary;
    }

    link(scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModel: ng.INgModelController) {
        const self = this;
        const containerWidth = angular.element(document.body.querySelectorAll('.background-box'))[0].clientWidth;
        const options: any = {
            viewport: {width: containerWidth, height: 320},
            boundary: {width: containerWidth, height: 320}
        };

        options.update = function (result: any) {
            const cropPoints = result.points;
            const x = cropPoints[0];
            const y = cropPoints[1];
            const width = cropPoints[2] - x;
            const height = cropPoints[3] - y;
            const crop = 'crop';
            ngModel.$setViewValue(self.cloudinary.url(scope.publicId, {x, y, width, height, crop}));
        };
        const croppie = new Croppie(element[0], options);

        scope.$watch('publicId', src => {
            if (src) {
                croppie.bind(self.cloudinary.url(src));
            }
        });
    }
}
