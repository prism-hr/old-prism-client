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

            ngModel.$render = function () {
                scope.place = ngModel.$modelValue;
                scope.searchText = _.get(scope.place, 'name');
            };

            scope.placeSelected = function (selectedPlace) {
                var place = angular.copy(selectedPlace);
                if(place && !place.id) {
                    place.name = scope.searchText;
                }
                ngModel.$setViewValue(place);
            };

            scope.getPlaces = function (input) {
                if (!angular.isString(input) || input === '') {
                    return;
                }
                var deferred = $q.defer();
                autocomplete.getPlacePredictions({input: input, types: ['address']}, function (places) {
                    places = _.map(places, function (place) {
                        return {id: 666, name: place.description, summary: 'Sample summary'};
                    });
                    places.unshift({name: 'Create ' + input});
                    deferred.resolve(places);
                });
                return deferred.promise;
            };
        }
    }
};
