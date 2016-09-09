var angular = require('angular');
require('angular-mocks');
// var welcome = require('./welcome');

describe('welcome component', function () {
    beforeEach(angular.mock.inject(function () {
        // angular
        //     .module('welcome', ['app/welcome/welcome.html'])
        //     .component('welcome', welcome);
        // angular.mock.module('welcome');
        // $httpBackend.whenGET('/img/student-logo.html').respond('');
    }));
    it('should render welcome world', angular.mock.inject(function () {
        // var element = $compile('<welcome>Loading...</welcome>')($rootScope);
        // $rootScope.$digest();
        // var h1 = element.find('h1');
        // expect(h1.html()).toEqual('Welcome!');
    }));
});
