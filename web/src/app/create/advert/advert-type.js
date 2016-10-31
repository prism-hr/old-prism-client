import moment from 'moment';

class AdvertTypeController {
    /** @ngInject */
    constructor(definitions) {
        this.definitions = definitions;

        this.refreshPublicationCloseConstraints = function () {
            this.minPublicationClose = this.timestampPublicationStart && new Date(
                    this.timestampPublicationStart.getFullYear(),
                    this.timestampPublicationStart.getMonth(),
                    this.timestampPublicationStart.getDate() + 1);
            this.maxPublicationClose = this.timestampPublicationStart && new Date(
                    this.timestampPublicationStart.getFullYear(),
                    this.timestampPublicationStart.getMonth() + 3,
                    this.timestampPublicationStart.getDate());
            if (moment(this.timestampPublicationClose).startOf('day').isBefore(moment(this.maxPublicationClose))) {
                this.timestampPublicationClose = this.maxPublicationClose;
                this.publicationCloseChanged();
            }
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
    }

    togglePattern(pattern) {
        const idx = this.advert.positionWorkPatterns.findIndex(p => p.positionWorkPattern === pattern);
        if (idx > -1) {
            this.advert.positionWorkPatterns.splice(idx, 1);
        } else {
            this.advert.positionWorkPatterns.push({positionWorkPattern: pattern});
        }
    }

    isPatternChecked(pattern) {
        return this.advert.positionWorkPatterns.find(p => p.positionWorkPattern === pattern);
    }

    anyPatternChecked() {
        return (this.advert.positionWorkPatterns.length !== 0 &&
        this.advert.positionWorkPatterns.length !== this.patternValues.length);
    }

    allPatternsChecked() {
        return this.advert.positionWorkPatterns.length === this.patternValues.length;
    }

    toggleAllPatterns() {
        if (this.advert.positionWorkPatterns.length === this.patternValues.length) {
            this.advert.positionWorkPatterns = [];
        } else if (this.advert.positionWorkPatterns.length === 0 || this.advert.positionWorkPatterns.length > 0) {
            this.advert.positionWorkPatterns = this.patternValues.map(p => ({positionWorkPattern: p}));
        }
    }

    publicationStartChanged() {
        this.advert.timestampPublicationStart = this.timestampPublicationStart.toISOString();
        this.refreshPublicationCloseConstraints();
    }

    publicationCloseChanged() {
        this.advert.timestampPublicationClose = this.timestampPublicationClose.toISOString();
    }

    showPublicationCloseChanged(show) {
        if (show) {
            this.advert.timestampPublicationClose = new Date(
                this.advert.timestampPublicationStart.getFullYear(),
                this.advert.timestampPublicationStart.getMonth() + 1,
                this.advert.timestampPublicationStart.getDate());
        }
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
