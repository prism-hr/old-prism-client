/** @ngInject */
export const materialConfig = function ($mdThemingProvider) {
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
        50: '#ffffff',
        100: '#c5efe6',
        200: '#99e3d3',
        300: '#61d4ba',
        400: '#48cdb0',
        500: '#35c2a3',
        600: '#2eaa8f',
        700: '#28927b',
        800: '#217a66',
        900: '#1b6252',
        A100: '#ffffff',
        A200: '#c5efe6',
        A400: '#48cdb0',
        A700: '#28927b',
        contrastDefaultColor: 'light',
        contrastDarkColors: '50 100 200 300 A100 A200'
    });

    $mdThemingProvider.definePalette('prismred', {
        50: '#ffffff',
        100: '#fef3e9',
        200: '#fcd5b3',
        300: '#f9af6f',
        400: '#f79e51',
        500: '#f68e34',
        600: '#f57e17',
        700: '#e36f0a',
        800: '#c56009',
        900: '#a85207',
        A100: '#ffffff',
        A200: '#fef3e9',
        A400: '#f79e51',
        A700: '#e36f0a',
        contrastDefaultColor: 'light',
        contrastDarkColors: '50 100 200 300 400 A100 A200 A400'
    });

    $mdThemingProvider.theme('prism')
        .primaryPalette('prismblue')
        .accentPalette('prismgreen')
        .warnPalette('prismred')
        .backgroundPalette('grey');
    $mdThemingProvider.setDefaultTheme('prism');
};

// TODO moment integration for date format
// function dateFormatProvider($mdDateLocaleProvider, moment) {
//     $mdDateLocaleProvider.formatDate = function (date) {
//         return moment(date).format('DD/MM/YYYY');
//     };
//
//     $mdDateLocaleProvider.parseDate = function (dateString) {
//         var m = moment(dateString, 'DD/MM/YYYY', true);
//         return m.isValid() ? m.toDate() : new Date(NaN);
//     };
// }
