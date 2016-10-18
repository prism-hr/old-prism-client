class AdvertTypeController {
    /** @ngInject */
    constructor(definitions) {
        this.definitions = definitions;
    }

    $onInit() {
        this.advert.positionContract = this.advert.positionContract || 'PERMANENT';
        this.patternValues = this.definitions.positionWorkPattern;
        this.advert.positionWorkPatterns = this.advert.positionWorkPatterns || [{positionWorkPattern: 'FULL_TIME'}];

        this.promotionClosingDateEnable = false;

        this.promotionDate = new Date();
        this.promotionClosingDate = this.promotionDate; // TODO add 1 month
        this.minPromotionDate = new Date(
            this.promotionDate.getFullYear(),
            this.promotionDate.getMonth(),
            this.promotionDate.getDate()
        );
        this.maxPromotionDate = new Date(
            this.promotionDate.getFullYear(),
            this.promotionDate.getMonth() + 3,
            this.promotionDate.getDate());
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

}

export const AdvertType = {
    template: require('./advert-type.html'),
    bindings: {
        form: '<',
        advert: '='
    },
    controller: AdvertTypeController
};
