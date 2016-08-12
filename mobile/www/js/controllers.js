angular.module('app.controllers', [])

  .controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {

    // Called to navigate to the main app
    $scope.startApp = function() {
      $state.go('login');
    };
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };
    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };
  })


  .controller('browseCtrl', ['$scope', '$stateParams', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('profileCtrl', ['$scope', '$stateParams', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

  .controller('profilePictureCtrl', ['$scope', '$stateParams', 'GetUU', // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $location, GetUU) {

      // init variables
      $scope.data = {};
      $scope.obj;
      var pictureSource;   // picture source
      var destinationType; // sets the format of returned value
      var url;

      // on DeviceReady check if already logged in (in our case CODE saved)
      ionic.Platform.ready(function() {
        //console.log("ready get camera types");
        if (!navigator.camera)
        {
          // error handling
          return;
        }
        //pictureSource=navigator.camera.PictureSourceType.PHOTOLIBRARY;
        pictureSource=navigator.camera.PictureSourceType.CAMERA;
        destinationType=navigator.camera.DestinationType.FILE_URI;
      });

      // get upload URL for FORM
      GetUU.query(function(response) {
        $scope.data = response;
        //console.log("got upload url ", $scope.data.uploadurl);
      });

      // take picture
      $scope.takePicture = function() {
        //console.log("got camera button click");
        var options =   {
          quality: 50,
          destinationType: destinationType,
          sourceType: pictureSource,
          encodingType: 0
        };
        if (!navigator.camera)
        {
          // error handling
          return;
        }
        navigator.camera.getPicture(
          function (imageURI) {
            //console.log("got camera success ", imageURI);
            $scope.mypicture = imageURI;
          },
          function (err) {
            //console.log("got camera error ", err);
            // error handling camera plugin
          },
          options);
      };

      // do POST on upload url form by http / html form
      $scope.update = function(obj) {
        if (!$scope.data.uploadurl)
        {
          // error handling no upload url
          return;
        }
        if (!$scope.mypicture)
        {
          // error handling no picture given
          return;
        }
        var options = new FileUploadOptions();
        options.fileKey="ffile";
        options.fileName=$scope.mypicture.substr($scope.mypicture.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";
        var params = {};
        params.other = obj.text; // some other POST fields
        options.params = params;

        //console.log("new imp: prepare upload now");
        var ft = new FileTransfer();
        ft.upload($scope.mypicture, encodeURI($scope.data.uploadurl), uploadSuccess, uploadError, options);
        function uploadSuccess(r) {
          // handle success like a message to the user
        }
        function uploadError(error) {
          //console.log("upload error source " + error.source);
          //console.log("upload error target " + error.target);
        }
      };

}])

.controller('messagesCtrl', ['$scope', '$stateParams', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('loginCtrl', ['$scope', '$stateParams', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

  .controller('passwordCtrl', ['$scope', '$stateParams', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('registerCtrl', ['$scope', '$stateParams', // TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('universityAndDepartmentCtrl', function($scope) {

  $scope.universities = [
    { id:1, name: "UCL", location : "London, UK", img:"ucl-logo.jpg"},
    { id:2, name: "Birmingham", location : "Birmingham, UK", img:"ucl-logo.jpg"},
    { id:3, name: "Southampton", location : "Southampton, UK", img:"ucl-logo.jpg"}
  ];

  $scope.departments = [
    { id:1, name: "Computer Science", location : "Gower Street, London", img:"ucl-logo.jpg"},
    { id:2, name: "Biological Engineering", location : "Gower Street, London", img:"ucl-logo.jpg"},
    { id:3, name: "Chemical Engineering", location : "Gower Street, London", img:"ucl-logo.jpg"}
  ];

})
