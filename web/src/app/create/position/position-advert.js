module.exports = {
    template: require('./position-advert.html'),
    bindings: {
        form: '<'
    },
    /** @ngInject */
    controller: function () {
        this.promotionDate = new Date();
        this.promotionClosingDate = this.promotionDate;
        this.minPromotionDate = new Date(
            this.promotionDate.getFullYear(),
            this.promotionDate.getMonth(),
            this.promotionDate.getDate()
        );
        this.maxPromotionDate = new Date(
            this.promotionDate.getFullYear(),
            this.promotionDate.getMonth() + 3,
            this.promotionDate.getDate());
        this.clearImage = function () {
            this.position.documentBackgroundImageOriginal = '';
            this.position.documentBackgroundImage = '';
            this.position.pallet = '';
            this.position.dominant = '';

        };
    }
};
