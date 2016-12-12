class AdvertRecruiterController {
    $onInit() {
    }
}

export const AdvertRecruiter = {
    template: require('./advert-recruiter.html'),
    bindings: {
        advert: '=',
        form: '<'
    },
    controller: AdvertRecruiterController
};
