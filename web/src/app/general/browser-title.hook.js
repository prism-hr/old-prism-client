module.exports = browserTitle;

/** @ngInject */
function browserTitle($rootScope, $state, $transitions) {
    $transitions.onSuccess({from: '*.**', to: '*.**'}, function (transition) {
        $rootScope.$title = transition.getResolveValue('$title');

        function getBreadcrumb(pathNode) {
            var titleResolvable = pathNode.resolvables.find(function (r) {
                return r.token === '$title';
            });

            return titleResolvable && {
                title: titleResolvable.data,
                href: $state.href(pathNode.state)
            };
        }

        var toPathNodes = transition.treeChanges().to;

        $rootScope.$breadcrumbs = toPathNodes
            .map(getBreadcrumb)
            .filter(angular.identity);
        if ($rootScope.$breadcrumbs.length > 1) {
            $rootScope.$title = _.map($rootScope.$breadcrumbs, 'title').join(' > ');
        }
    });
}
