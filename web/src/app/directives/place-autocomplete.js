/** @ngInject */
module.exports = function ($q) {
    return {
        template: require('./place-autocomplete.html'),
        require: 'ngModel',
        restrict: 'E',
        scope: {
            types: '<',
            placeholder: '@'
        },
        link: function (scope, element, attrs, ngModel) {
            if (!google || !google.maps) {
                throw new Error('Google Maps JS library is not loaded!');
            } else if (!google.maps.places) {
                throw new Error('Google Maps JS library does not have the Places module');
            }
            scope.placeholder = attrs.placeholder;
            var autocomplete = new google.maps.places.AutocompleteService();
            var map = new google.maps.Map(document.createElement('div'));
            var placeService = new google.maps.places.PlacesService(map);

            ngModel.$render = function () {
                scope.searchText = _.get(ngModel.$modelValue, 'description');
            };

            scope.placeSelected = function (selectedPlace) {
                if (!selectedPlace) {
                    ngModel.$setViewValue(undefined);
                    return;
                }
                placeService.getDetails({placeId: selectedPlace.place_id}, function (place) {
                    scope.$apply(function () {
                        var location = extractLocation(place);
                        ngModel.$setViewValue(location);
                    });
                });
            };

            scope.getPlaces = function (input) {
                if (!angular.isString(input) || input === '') {
                    return;
                }
                var deferred = $q.defer();
                autocomplete.getPlacePredictions({input: input, types: ['address']}, function (places) {
                    deferred.resolve(places || {});
                });
                return deferred.promise;
            };

            function extractLocation(place) {
                function getAddressPart(componentType) {
                    var component = _.find(place.address_components, function (component) {
                        return _.includes(component.types, componentType);
                    });
                    return component ? component.short_name : undefined;
                }

                var domicile = getAddressPart('country');
                var displayAddress = place.formatted_address;
                var postalTown = getAddressPart('postal_town');
                var alternativeTown = getAddressPart('locality');
                var administrativeAreaLevel2 = getAddressPart('administrative_area_level_2');
                var administrativeAreaLevel3 = getAddressPart('administrative_area_level_3');
                var administrativeAreaLevel4 = getAddressPart('administrative_area_level_4');
                var administrativeAreaLevel5 = getAddressPart('administrative_area_level_5');
                var geolocation = place.geometry.location;

                var location = {};
                location.name = postalTown || alternativeTown || administrativeAreaLevel2 || administrativeAreaLevel3 || administrativeAreaLevel4 || administrativeAreaLevel5;
                location.description = displayAddress;
                location.domicile = domicile;
                location.googleId = place.place_id;
                location.latitude = geolocation.lat();
                location.longitude = geolocation.lng();

                return location;
            }
        }
    };
};

