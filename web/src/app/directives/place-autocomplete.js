export class PlaceAutocomplete {
    /** @ngInject */
    constructor($q) {
        this.template = require('./place-autocomplete.html');
        this.require = 'ngModel';
        this.restrict = 'E';
        this.scope = {
            types: '<',
            placeholder: '@'
        };
        this.$q = $q;
    }

    link(scope, element, attrs, ngModel) {
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

        scope.transformChip = function (chip) {
            return {googleId: chip.place_id, name: chip.description};
        };

        scope.placeAdded = function (place) {
            placeService.getDetails({placeId: place.googleId}, placeDetails => {
                scope.$apply(() => {
                    applyLocationFields(place, placeDetails);
                    const places = _.map(scope.places, place => ({location: place}));
                    ngModel.$setViewValue(places.length && places);
                });
            });
        };

        scope.getPlaces = function (input) {
            if (!angular.isString(input) || input === '') {
                return;
            }
            const deferred = self.$q.defer();
            autocomplete.getPlacePredictions({input, types: ['geocode']}, places => {
                deferred.resolve(places || {});
            });
            return deferred.promise;
        };

        function applyLocationFields(place, placeDetails) {
            function getAddressPart(componentType, type) {
                const component = _.find(placeDetails.address_components, component => _.includes(component.types, componentType));
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
