import moment from 'moment';

/** @ngInject */
export const materialConfig = function ($mdThemingProvider, $mdDateLocaleProvider, $provide) {
    $mdThemingProvider.definePalette('prismblue', {
        50: '#d9edf5',
        100: '#9dd2e4',
        200: '#70bdd8',
        300: '#38a3c9',
        400: '#3191b2',
        500: '#2a7d9a',
        600: '#236982',
        700: '#1d566a',
        800: '#164252',
        900: '#102f3a',
        A100: '#d9edf5',
        A200: '#9dd2e4',
        A400: '#3191b2',
        A700: '#1d566a',
        contrastDefaultColor: 'light',
        contrastDarkColors: '50 100 200 300 A100 A200'
    });

    $mdThemingProvider.definePalette('prismgreen', {
        50: '#f0f7ee',
        100: '#c1dfb9',
        200: '#9fce93',
        300: '#74b762',
        400: '#62ac4f',
        500: '#569745',
        600: '#4a823b',
        700: '#3e6d32',
        800: '#325828',
        900: '#26431f',
        A100: '#f0f7ee',
        A200: '#c1dfb9',
        A400: '#62ac4f',
        A700: '#3e6d32',
        contrastDefaultColor: 'light',
        contrastDarkColors: '50 100 200 300 A100 A200'
    });

    $mdThemingProvider.definePalette('prismred', {
        50: '#ffffff',
        100: '#fad8cd',
        200: '#f4b09b',
        300: '#ed7d5a',
        400: '#ea683f',
        500: '#e75223',
        600: '#d44417',
        700: '#b93c14',
        800: '#9d3311',
        900: '#812a0e',
        A100: '#ffffff',
        A200: '#fad8cd',
        A400: '#ea683f',
        A700: '#b93c14',
        contrastDefaultColor: 'light',
        contrastDarkColors: '50 100 200 300 400 A100 A200'
    });

    $mdThemingProvider.theme('prism')
        .primaryPalette('prismblue')
        .accentPalette('prismgreen')
        .warnPalette('prismred')
        .backgroundPalette('grey');
    $mdThemingProvider.setDefaultTheme('prism');

    $mdDateLocaleProvider.parseDate = function (dateString) {
        const m = moment(dateString, 'L', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };

    $mdDateLocaleProvider.formatDate = function (date) {
        const m = moment(date);
        return m.isValid() ? m.format('L') : '';
    };

    $provide.decorator('mdDatepickerDirective', $delegate => {
        const mdDatepicker = $delegate[0];
        const originalLink = mdDatepicker.link;

        mdDatepicker.compile = function () {
            return function fixMdDatepickerLink(scope, element, attr, controllers) {
                originalLink.apply(this, arguments);

                const mdDatePickerCtrl = controllers[1];

                // https://github.com/angular/material/issues/5938
                mdDatePickerCtrl.$scope.$watch(() => mdDatePickerCtrl.minDate, () => {
                    if (mdDatePickerCtrl.dateUtil.isValidDate(mdDatePickerCtrl.date)) {
                        mdDatePickerCtrl.updateErrorState();
                    }
                });

                // https://github.com/angular/material/issues/6086
                mdDatePickerCtrl.$scope.$watch(() => mdDatePickerCtrl.date, () => {
                    mdDatePickerCtrl.updateErrorState();
                });
            };
        };
        return $delegate;
    });
};
