import {DefinitionsService} from './definitions.service';

/** @ngInject */
export const definitionsLoadHook = function ($transitions: any, definitions: DefinitionsService) {
    $transitions.onBefore({from: '*.**', to: '*.**'}, () => definitions.loadDefinitions());
};
