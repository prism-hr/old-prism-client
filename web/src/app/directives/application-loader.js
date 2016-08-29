/** @ngInject */
module.exports = function ($animate) {
    return ({
        link: link,
        restrict: "C"
    });
    function link(scope, element) {
        $animate.enabled(true);
        $animate.leave(element.children().eq(1)).then(
            function cleanupAfterAnimation() {
                element.remove();
            }
        );
    }
}
;
