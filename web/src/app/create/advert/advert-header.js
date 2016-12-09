class AdvertHeaderController {
}

export const AdvertHeader = {
    template: require('./advert-header.html'),
    bindings: {
        advert: '=',
        form: '<'
    },
    controller: AdvertHeaderController
};
