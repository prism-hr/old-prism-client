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
                scope.places = ngModel.$modelValue ? angular.copy(_.map(ngModel.$modelValue, 'location')) : [];
            };

            scope.transformChip = function (chip) {
                console.log(chip);
                return {googleId: chip.place_id, description: chip.description};
            };

            scope.placeAdded = function (place) {
                placeService.getDetails({placeId: place.googleId}, function (placeDetails) {
                    scope.$apply(function () {
                        applyLocationFields(place, placeDetails);
                        ngModel.$setViewValue(_.map(scope.places, function (place) {
                            return {location: place};
                        }));
                    });
                });
            };

            scope.getPlaces = function (input) {
                if (!angular.isString(input) || input === '') {
                    return;
                }
                var deferred = $q.defer();
                autocomplete.getPlacePredictions({input: input, types: ['geocode']}, function (places) {
                    deferred.resolve(places || {});
                });
                return deferred.promise;
            };

            function applyLocationFields(place, placeDetails) {
                function getAddressPart(componentType, type) {
                    var component = _.find(placeDetails.address_components, function (component) {
                        return _.includes(component.types, componentType);
                    });
                    if (type === 'long') {
                        return component ? component.long_name : undefined;
                    }
                    return component ? component.short_name : undefined;
                }

                var domicile = getAddressPart('country', 'short');
                var displayAddress = placeDetails.formatted_address;
                var alternativeTown = getAddressPart('locality', 'long');
                var administrativeAreaLevel1 = getAddressPart('administrative_area_level_1', 'long');
                var administrativeAreaLevel2 = getAddressPart('administrative_area_level_2', 'long');
                var administrativeAreaLevel3 = getAddressPart('administrative_area_level_3', 'long');
                var administrativeAreaLevel4 = getAddressPart('administrative_area_level_4', 'long');
                var naturalFeature = getAddressPart('natural_feature', 'long');
                var geolocation = placeDetails.geometry.location;

                place.name = alternativeTown || naturalFeature || administrativeAreaLevel4 || administrativeAreaLevel3 || administrativeAreaLevel2 || administrativeAreaLevel1;
                place.description = displayAddress;
                place.domicile = domicile;
                place.latitude = geolocation.lat();
                place.longitude = geolocation.lng();
            }
        }
    };
};

