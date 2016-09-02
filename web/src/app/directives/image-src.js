/** @ngInject */
module.exports = function ($compile, Restangular) {
    return ({
        restrict: 'A',
        replace: true,
        template: '<img ngf-src="({{original}}) || {{saved}} || \'/img/prism-logo-default.png\'">',
        link: function (scope, element) {
            var documentsUrl = Restangular.one('public').all('documents').getRestangularUrl();
            var src = element.attr('image-src');
            scope.original = src + '.id ? \'' + documentsUrl + '/\' + ' + src + '.id : false';
            scope.saved = src;
        }
    });
}
;
