import * as angular from 'angular';
import * as _ from 'lodash';
import {StateService, TransitionService, Transition, PathNode} from 'angular-ui-router';

/** @ngInject */
export const browserTitleHook = function ($rootScope: any, $state: StateService, $transitions: TransitionService) {
    $transitions.onSuccess({from: '*.**', to: '*.**'}, (transition: Transition) => {
        $rootScope.$title = transition.getResolveValue('$title');

        function getBreadcrumb(pathNode: PathNode) {
            const titleResolvable = pathNode.resolvables
                .find(r => r.token === '$title');

            if (titleResolvable) {
                return {
                    title: titleResolvable.data,
                    href: $state.href(pathNode.state, {})
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
