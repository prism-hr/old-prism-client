/** @ngInject */
module.exports = {
    employer: [
        {id: 'category', component: 'organizationCategory'},
        {id: 'lookup', component: 'organizationLookup'},
        {id: 'summary', component: 'organizationSummary'},
        {id: 'address', component: 'organizationAddress'},
        {id: 'assets', component: 'organizationAssets', data: {lastCreateStep: true}},
        {id: 'view', component: 'organizationPreview'}]
};
