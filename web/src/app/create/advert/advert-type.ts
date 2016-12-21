import * as moment from 'moment';

class AdvertTypeController {
    private patternValues: any;
    private advert: any;
    private showPublicationClose: boolean;
    private timestampPublicationStart: Date;
    private timestampPublicationClose: Date;
    private minPublicationStart: Date;
    private maxPublicationStart: Date;
    private patternsHelper: any;
    private minPublicationClose: Date;

    /** @ngInject */
    constructor(private checkboxesHelper: any, private definitions: any) {
    }

    $onInit() {
        this.patternValues = this.definitions.positionWorkPattern;
        this.advert.positionContract = this.advert.positionContract || 'PERMANENT';
        this.advert.positionWorkPatterns = this.advert.positionWorkPatterns || [{positionWorkPattern: 'FULL_TIME'}];
        this.advert.timestampPublicationStart = this.advert.timestampPublicationStart || moment().utc().startOf('day').toISOString();

        this.showPublicationClose = Boolean(this.advert.timestampPublicationClose);

        this.timestampPublicationStart = this.advert.timestampPublicationStart && new Date(this.advert.timestampPublicationStart);
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
        this.advert.timestampPublicationStart = moment(this.timestampPublicationStart).utc().startOf('day').toISOString();
        this.refreshPublicationCloseConstraints();
    }

    publicationCloseChanged() {
        this.advert.timestampPublicationClose = this.timestampPublicationClose ? moment(this.timestampPublicationClose).utc().startOf('day').toISOString() : null;
    }

    showPublicationCloseChanged(show: boolean) {
        this.timestampPublicationClose = show ? moment(this.timestampPublicationStart).add(1, 'months').toDate() : null;
        this.publicationCloseChanged();
        this.refreshPublicationCloseConstraints();
    }

    private refreshPublicationCloseConstraints() {
        this.minPublicationClose = this.timestampPublicationStart && new Date(
                this.timestampPublicationStart.getFullYear(),
                this.timestampPublicationStart.getMonth(),
                this.timestampPublicationStart.getDate() + 1);
    };
}

export const AdvertType = {
    template: require('./advert-type.html'),
    bindings: {
        advert: '=',
        wizard: '<'
    },
    controller: AdvertTypeController
};
