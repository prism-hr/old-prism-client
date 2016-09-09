/** @ngInject */
module.exports = {
    employer: [
        {id: 'category', component: 'organizationCategory', title: 'Category'},
        {id: 'lookup', component: 'organizationLookup', title: 'Organization Lookup'},
        {id: 'summary', component: 'organizationSummary', title: 'Summary'},
        {id: 'address', component: 'organizationAddress', title: 'Address'},
        {id: 'assets', component: 'organizationAssets', title: 'Assets', data: {skippable: true}},
        {id: 'view', component: 'organizationPreview', title: 'View', data: {previewStep: true}}]
};
