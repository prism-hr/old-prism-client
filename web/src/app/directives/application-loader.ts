/** @ngInject */
export class ApplicationLoader implements ng.IDirective {
    restrict = 'C';

    static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory =
            ($animate: any) => new ApplicationLoader($animate);
        directive.$inject = ['$animate'];
        return directive;
    }

    constructor(private $animate: any) {
    }

    link(scope: ng.IScope, element: ng.IAugmentedJQuery) {
        this.$animate.enabled(true);
        this.$animate.leave(element.children().eq(1))
            .then(() => element.remove());
    }


}
