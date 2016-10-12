class AdvertTypeController {
    $onInit() {
        this.advert.advertType = 'EMPLOYMENT';
        this.advert.duration = 'PERMANENT';
        this.items = ['Full Time', 'Part Time', 'Flexible'];
        this.selected = ['Full Time'];

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

    toggle(item, list) {
        const idx = list.indexOf(item);
        if (idx > -1) {
            list.splice(idx, 1);
        } else {
            list.push(item);
        }
    }

    exists(item, list) {
        return list.indexOf(item) > -1;
    }

    isIndeterminate() {
        return (this.selected.length !== 0 &&
        this.selected.length !== this.items.length);
    }

    isChecked() {
        return this.selected.length === this.items.length;
    }

    toggleAll() {
        if (this.selected.length === this.items.length) {
            this.selected = [];
        } else if (this.selected.length === 0 || this.selected.length > 0) {
            this.selected = this.items.slice(0);
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
