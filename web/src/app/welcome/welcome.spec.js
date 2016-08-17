var angular = require('angular');
require('angular-mocks');
var welcome = require('./welcome');

describe('welcome component', function () {
    beforeEach(function () {
        angular
            .module('welcome', ['welcome/welcome.html'])
            .component('welcome', welcome);
        angular.mock.module('welcome');
    });
    it('should render welcome world', angular.mock.inject(function ($rootScope, $compile) {
        var element = $compile('<welcome>Loading...</welcome>')($rootScope);
        $rootScope.$digest();
        var h1 = element.find('h1');
        expect(h1.html()).toEqual('Welcome!');
    }));
});
