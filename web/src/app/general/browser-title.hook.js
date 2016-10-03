/** @ngInject */
export const browserTitleHook = function ($rootScope, $state, $transitions) {
    $transitions.onSuccess({from: '*.**', to: '*.**'}, transition => {
        $rootScope.$title = transition.getResolveValue('$title');

        function getBreadcrumb(pathNode) {
            const titleResolvable = pathNode.resolvables
                .find(r => r.token === '$title');

            if (titleResolvable) {
                return {
                    title: titleResolvable.data,
                    href: $state.href(pathNode.state)
                };
            }
            return null;
        }

        const toPathNodes = transition.treeChanges().to;

        $rootScope.$breadcrumbs = toPathNodes
            .map(getBreadcrumb)
            .filter(angular.identity);
        if ($rootScope.$breadcrumbs.length > 1) {
            $rootScope.$title = _.map($rootScope.$breadcrumbs, 'title').join(' > ');
        }
    });
};
