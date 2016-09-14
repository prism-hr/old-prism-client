module.exports = {
    template: require('./position.html'),

    /** @ngInject */
    controller: function () {
        this.isOpen = false;
        this.tabs = [
            {title: 'One', content: 'tab1'},
            {title: 'dos', content: 'Tab2'},
            {title: 'tes', content: 'tab3'},
            {title: 'tes2', content: 'tab32'},
            {title: 'tes3', content: 'tab33'},
            {title: 'tes4', content: 'tab34'},
            {title: 'cuatro', content: 'tab4'}
        ];
        this.maxTabs = this.tabs.length;
        this.selectedIndex = 0;

        this.nextTab = function () {
            var index = (this.selectedIndex === this.maxTabs - 1) ? 0 : this.selectedIndex + 1;
            this.selectedIndex = index;
        };
        this.backTab = function () {
            var index = (this.selectedIndex === 0) ? this.maxTabs : this.selectedIndex - 1;
            this.selectedIndex = index;
        };
    }
};
