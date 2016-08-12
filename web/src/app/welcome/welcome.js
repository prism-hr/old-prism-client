module.exports = {
  templateUrl: 'app/welcome/welcome.html',
  controller: function($scope, environment) {
    $scope.title = environment.distribution;
  }
};
