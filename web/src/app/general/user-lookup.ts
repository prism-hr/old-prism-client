import ContactRepresentation = bf.ContactRepresentation;
import * as restangular from 'restangular';

class UserLookupController {
    view: ViewType;
    contact: ContactRepresentation;

    /** @ngInject */
    constructor(private Restangular: Restangular.IService) {
    }

    $onInit() {
        this.view = 'lookup';
    }

    contactSelected() {
    }

    cannotFindContact() {
        this.view = 'details';
        delete this.contact;
    }

    returnToSearch() {
        this.view = 'lookup';
        delete this.contact;
    }

    getContacts(searchTerm: string) {
        return this.Restangular.all('contacts').getList({searchTerm: searchTerm})
            .then((contacts: restangular.ICollection) => contacts.plain());
    }
}

export const UserLookup = {
    template: require('./user-lookup.html'),
    bindings: {
        contact: '=',
        form: '<'
    },
    controller: UserLookupController
};

type ViewType = 'lookup' | 'details';
