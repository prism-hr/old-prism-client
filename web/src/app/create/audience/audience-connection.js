class AudienceConnectionController {
}

export const AudienceConnection = {
    template: require('./audience-connection.html'),
    bindings: {
        advert: '=',
        form: '<'
    },
    controller: AudienceConnectionController
};
