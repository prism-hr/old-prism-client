/** @ngInject */
export const CheckboxesHelper = function () {
    class CheckboxesHelperInstance {
        constructor(possibleItems, selectedItems, propertyName) {
            this.possibleItems = possibleItems;
            this.selectedItems = selectedItems;
            this.propertyName = propertyName;
        }

        toggle(item) {
            const idx = this.selectedItems.findIndex(p => p[this.propertyName] === item);
            if (idx > -1) {
                this.selectedItems.splice(idx, 1);
            } else {
                this.selectedItems.push({[this.propertyName]: item});
            }
        }

        isChecked(item) {
            return this.selectedItems.find(p => p[this.propertyName] === item);
        }

        anyChecked() {
            return (this.selectedItems.length !== 0 &&
            this.selectedItems.length !== this.possibleItems.length);
        }

        allChecked() {
            return this.selectedItems.length === this.possibleItems.length;
        }

        toggleAll() {
            if (this.selectedItems.length === this.possibleItems.length) {
                this.selectedItems = [];
            } else if (this.selectedItems.length === 0 || this.selectedItems.length > 0) {
                this.selectedItems = this.possibleItems.map(p => ({[this.propertyName]: p}));
            }
        }
    }

    return {
        create(possibleItems, selectedItems, propertyName) {
            return new CheckboxesHelperInstance(possibleItems, selectedItems, propertyName);
        }
    };
};

