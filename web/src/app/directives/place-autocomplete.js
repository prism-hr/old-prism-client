module.exports = function ($q) {
    return {
        templateUrl: 'app/directives/place-autocomplete.html',
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
                scope.place = ngModel.$modelValue;
                scope.searchText = _.get(scope.place, 'name');
            };

            scope.newPlace = function (text) {
                ngModel.$setViewValue({name: text});
            };

            scope.placeSelected = function (selectedPlace) {
                if (selectedPlace.alreadyRegistered) {
                    scope.place = selectedPlace;
                    ngModel.$setViewValue(scope.place);
                } else {
                    placeService.getDetails({placeId: selectedPlace.googleId}, function (place) {
                        scope.$apply(function () {
                            scope.place = {};
                            if (place) {
                                scope.place.id = 666; // FIXME found institutions will have ID
                                scope.place.name = place.name;
                                scope.place.address = place.formatted_address;
                                scope.place.phone = place.international_phone_number;
                            }
                            ngModel.$setViewValue(scope.place);
                        });
                    });
                }
            };

            scope.getPlaces = function (input) {
                if (!angular.isString(input) || input === '') {
                    return;
                }
                var deferred = $q.defer();
                autocomplete.getPlacePredictions({input: input, types: ['address']}, function (places) {
                    places = _.map(places, function (place) {
                        return {name: place.description, googleId: place.place_id};
                    });
                    deferred.resolve(places);
                    // var googleIds = _.map(places, 'place_id');
                    // Restangular.all('institutions').getList({
                    //     query: input,
                    //     googleIds: googleIds,
                    //     type: 'simple'
                    // })
                    //     .then(function (institutions) {
                    //         _.each(institutions, function (institution) {
                    //             var googleId = institution.address.googleId;
                    //             var place = _.findWhere(places, {'place_id': googleId});
                    //             if (!place) {
                    //                 place = institutionToPlace(institution);
                    //                 places.push(place);
                    //             }
                    //             place.institution = institution.plain();
                    //             place.alreadyRegistered = true;
                    //         });
                    //         places = _.sortBy(places, 'alreadyRegistered');
                    //         deferred.resolve(places);
                    //     });
                });
                return deferred.promise;
            };
        }
    }
};
