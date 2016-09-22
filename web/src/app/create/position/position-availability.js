module.exports = {
    template: require('./position-availability.html'),
    bindings: {
        form: '<'
    },
    /** @ngInject */
    controller: function () {

        this.items = ['Full Time', 'Part Time', 'Flexible'];
        this.selected = [];
        this.toggle = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            } else {
                list.push(item);
            }
        };
        this.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };
        this.isIndeterminate = function () {
            return (this.selected.length !== 0 &&
            this.selected.length !== this.items.length);
        };
        this.isChecked = function () {
            return this.selected.length === this.items.length;
        };
        this.toggleAll = function () {
            if (this.selected.length === this.items.length) {
                this.selected = [];
            } else if (this.selected.length === 0 || this.selected.length > 0) {
                this.selected = this.items.slice(0);
            }
        };
        this.promotionClosingDateEnable = false;
    }
};
