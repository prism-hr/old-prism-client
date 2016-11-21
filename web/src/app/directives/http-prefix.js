export class HttpPrefix {
    /** @ngInject */
    constructor() {
        this.require = 'ngModel';
        this.restrict = 'A';
    }

    link(scope, element, attrs, ngModel) {
        function ensureHttpPrefix(value) {
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
