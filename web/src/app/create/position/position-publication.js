module.exports = {
    template: require('./position-publication.html'),
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
    }
};
