import moment from 'moment';

class AdvertTypeController {
    /** @ngInject */
    constructor(checkboxesHelper, definitions) {
        this.checkboxesHelper = checkboxesHelper;
        this.definitions = definitions;

        this.refreshPublicationCloseConstraints = function () {
            this.minPublicationClose = this.timestampPublicationStart && new Date(
                    this.timestampPublicationStart.getFullYear(),
                    this.timestampPublicationStart.getMonth(),
                    this.timestampPublicationStart.getDate() + 1);
        };
    }

    $onInit() {
        this.patternValues = this.definitions.positionWorkPattern;
        this.advert.positionContract = this.advert.positionContract || 'PERMANENT';
        this.advert.positionWorkPatterns = this.advert.positionWorkPatterns || [{positionWorkPattern: 'FULL_TIME'}];

        this.showPublicationClose = Boolean(this.advert.timestampPublicationClose);

        this.timestampPublicationStart = this.advert.timestampPublicationStart ? new Date(this.advert.timestampPublicationStart) : new Date();
        this.timestampPublicationClose = this.advert.timestampPublicationClose && new Date(this.advert.timestampPublicationClose);

        this.minPublicationStart = new Date();
        this.maxPublicationStart = new Date(
            this.minPublicationStart.getFullYear(),
            this.minPublicationStart.getMonth() + 3,
            this.minPublicationStart.getDate());
        this.refreshPublicationCloseConstraints();
        this.patternsHelper = this.checkboxesHelper.create(this.definitions.positionWorkPattern, this.advert.positionWorkPatterns, 'positionWorkPattern');
    }

    publicationStartChanged() {
        this.advert.timestampPublicationStart = this.timestampPublicationStart.toISOString();
        this.refreshPublicationCloseConstraints();
    }

    publicationCloseChanged() {
        this.advert.timestampPublicationClose = this.timestampPublicationClose ? this.timestampPublicationClose.toISOString() : null;
    }

    showPublicationCloseChanged(show) {
        this.timestampPublicationClose = show ? moment(this.timestampPublicationStart).add(1, 'months').toDate() : null;
        this.publicationCloseChanged();
        this.refreshPublicationCloseConstraints();
    }
}

export const AdvertType = {
    template: require('./advert-type.html'),
    bindings: {
        form: '<',
        advert: '='
    },
    controller: AdvertTypeController
};
