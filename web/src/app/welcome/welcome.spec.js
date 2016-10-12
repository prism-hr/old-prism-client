import angular from 'angular';
import 'angular-mocks';
// import {MainSection} from './MainSection';

describe('welcome component', () => {
    beforeEach(angular.mock.inject(() => {
        // angular
        //     .module('welcome', ['app/welcome/welcome.html'])
        //     .component('welcome', welcome);
        // angular.mock.module('welcome');
        // $httpBackend.whenGET('/img/student-logo.html').respond('');
    }));
    it('should render welcome world', angular.mock.inject(() => {
        // var element = $compile('<welcome>Loading...</welcome>')($rootScope);
        // $rootScope.$digest();
        // var h1 = element.find('h1');
        // expect(h1.html()).toEqual('Welcome!');
    }));
});
