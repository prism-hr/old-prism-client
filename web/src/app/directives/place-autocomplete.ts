import * as _ from 'lodash';
import * as angular from 'angular';
declare var google: any;

export class PlaceAutocomplete {
    template = require('./place-autocomplete.html');
    require = 'ngModel';
    restrict = 'E';
    scope = {
        types: '<',
        placeholder: '@'
    };

    static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory =
            ($q: ng.IQService) => new PlaceAutocomplete($q);
        directive.$inject = ['$q'];
        return directive;
    }

    constructor(private $q: ng.IQService) {
    }

    link(scope: any, element: ng.IAugmentedJQuery, attrs: any, ngModel: ng.INgModelController) {
        const self = this;
        if (!google || !google.maps) {
            throw new Error('Google Maps JS library is not loaded!');
        } else if (!google.maps.places) {
            throw new Error('Google Maps JS library does not have the Places module');
        }
        scope.placeholder = attrs.placeholder;
        const autocomplete = new google.maps.places.AutocompleteService();
        const map = new google.maps.Map(document.createElement('div'));
        const placeService = new google.maps.places.PlacesService(map);

        ngModel.$render = function () {
            scope.places = ngModel.$modelValue ? angular.copy(_.map(ngModel.$modelValue, 'location')) : [];
        };

        scope.transformChip = function (chip: any) {
            return {googleId: chip.place_id, name: chip.description};
        };

        scope.placeAdded = function (place: any) {
            placeService.getDetails({placeId: place.googleId}, placeDetails => {
                scope.$apply(() => {
                    applyLocationFields(place, placeDetails);
                    const places = _.map(scope.places, place => ({location: place}));
                    ngModel.$setViewValue(places.length && places);
                });
            });
        };

        scope.getPlaces = function (input: any) {
            if (!angular.isString(input) || input === '') {
                return;
            }
            const deferred = self.$q.defer();
            autocomplete.getPlacePredictions({input, types: ['(regions)']}, places => {
                deferred.resolve(places || {});
            });
            return deferred.promise;
        };

        function applyLocationFields(place: any, placeDetails: any) {
            function getAddressPart(componentType: any, type: string) {
                const component: any = _.find(placeDetails.address_components, (component: any) => _.includes(component.types, componentType));
                if (type === 'long') {
                    return component ? component.long_name : undefined;
                }
                return component ? component.short_name : undefined;
            }

            const domicile = getAddressPart('country', 'short');
            const displayAddress = placeDetails.formatted_address;
            const geolocation = placeDetails.geometry.location;

            place.name = displayAddress;
            place.domicile = domicile;
            place.latitude = geolocation.lat();
            place.longitude = geolocation.lng();
        }
    }
}
