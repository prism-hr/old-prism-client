class AdvertRecruiterController {
}

export const AdvertRecruiter = {
    template: require('./advert-recruiter.html'),
    bindings: {
        advert: '=',
        form: '<'
    },
    controller: AdvertRecruiterController
};
