/** @ngInject */
export class ApplicationLoader {
    constructor($animate) {
        this.restrict = 'C';
        this.$animate = $animate;
    }

    link(scope, element) {
        this.$animate.enabled(true);
        this.$animate.leave(element.children().eq(1))
            .then(() => element.remove());
    }
}
