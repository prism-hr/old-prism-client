class AdvertRecruiterController {
    $onInit() {
        this.advert.newOrganization = this.advert.newOrganization || false;
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
