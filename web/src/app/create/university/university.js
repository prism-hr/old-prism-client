module.exports = {
    template: require('./university.html'),
    /** @ngInject */
    controller: function () {
        this.step = 0;

        this.submit = function (form) {
            if (!form.$valid) {
                return;
            }
            this.step++;
        };

        this.back = function () {
            self.step--;
        };
    }
};
