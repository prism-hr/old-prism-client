/** @ngInject */
export class ImageSrc {
    constructor($animate, Restangular) {
        this.restrict = 'A';
        this.replace = true;
        this.template = '<img ngf-src="({{original}}) || {{saved}} || \'/img/prism-logo-default.png\'">';
        this.Restangular = Restangular;
    }

    link(scope, element) {
        const documentsUrl = this.Restangular.one('public').all('documents').getRestangularUrl();
        const src = element.attr('image-src');
        scope.original = src + '.id ? \'' + documentsUrl + '/\' + ' + src + '.id : false';
        scope.saved = src;
    }
}
