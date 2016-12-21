class AdvertRecruiterController {
}

export const AdvertRecruiter = {
    template: require('./advert-recruiter.html'),
    bindings: {
        advert: '=',
        wizard: '<'
    },
    controller: AdvertRecruiterController
};
