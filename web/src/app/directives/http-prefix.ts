export class HttpPrefix {
    require = 'ngModel';
    restrict = 'A';

    static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory =
            () => new HttpPrefix();
        directive.$inject = [];
        return directive;
    }

    link(scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModel: ng.INgModelController) {
        function ensureHttpPrefix(value: string) {
            if (value && !/^(https?):\/\//i.test(value) && 'http://'.indexOf(value) !== 0 && 'https://'.indexOf(value) !== 0) {
                ngModel.$setViewValue('http://' + value);
                ngModel.$render();
                return 'http://' + value;
            }
            return value;
        }

        ngModel.$formatters.push(ensureHttpPrefix);
        ngModel.$parsers.splice(0, 0, ensureHttpPrefix);
    }
}
