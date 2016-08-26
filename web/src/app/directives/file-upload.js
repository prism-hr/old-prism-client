/** @ngInject */
module.exports = function () {
    return {
        templateUrl: 'app/directives/file-upload.html',
        require: 'ngModel',
        restrict: "E",
        scope: {
            ngModel: '=',
            fileCategory: '@',
            imageCategory: '@',
            entityId: '@'
        },
        /** @ngInject */
        controller: function (Upload) {
            return {
                pre: function (scope) {
                    scope.apiBaseUrl = scope.$root.apiBaseUrl;

                    scope.fileCategory = scope.fileCategory || 'documents';
                    scope.acceptType = scope.fileCategory === 'images' ? 'image/*' : 'application/pdf';
                },
                post: function (scope, elem, attrs, ctrl) {
                    scope.imageBaseUrl = scope.$parent.imageBaseUrl;
                    scope.multiple = attrs.multiple;

                    if (scope.fileCategory !== 'documents' && scope.fileCategory !== 'images') {
                        throw new Error('Unexpected file category: ' + scope.fileCategory);
                    }
                    if (scope.fileCategory === 'images' && scope.multiple) {
                        throw new Error('Cannot upload multiple images');
                    }

                    var messageContainer = elem.find('.message-container');
                    var messageContainerId = 'id_' + aaUtils.guid();
                    messageContainer.attr('id', messageContainerId);
                    var alert;

                    scope.onFileSelect = function (files) {
                        if (!files || files.length === 0) {
                            return;
                        }
                        if (!scope.multiple) {
                            delete scope.ngModel;
                        }
                        if (alert) {
                            alert.destroy();
                        }

                        var selectedFile = files[0];
                        if (selectedFile.size > 2097152) {
                            alert = $alert({
                                title: 'Could not upload file',
                                content: 'File size cannot exceed 2MB.',
                                placement: 'top',
                                type: 'danger',
                                container: '#' + messageContainerId,
                                show: true
                            });
                            return;
                        }

                        var data = {
                            entityId: scope.entityId,
                            imageCategory: scope.imageCategory,
                            file: selectedFile
                        };

                        scope.upload = Upload.upload({
                            url: apiBaseUrl + '/' + scope.fileCategory,
                            method: 'POST',
                            data: data
                        }).success(function (data, status, headers, config) {
                            var uploadedFile = {fileName: config.data.file.name, id: data.id};
                            if (scope.multiple) {
                                if (!scope.ngModel) {
                                    scope.ngModel = [];
                                }
                                scope.ngModel.push(uploadedFile);
                            } else {
                                scope.ngModel = uploadedFile;
                            }
                        }).error(function (data) {
                            alert = $alert({
                                title: 'Could not upload file',
                                content: data.reason || 'Unknown reason',
                                placement: 'top',
                                type: 'danger',
                                container: '#' + messageContainerId,
                                show: true
                            });
                        });
                    };
                    scope.deleteFile = function (file) {
                        if (scope.multiple) {
                            var index = scope.ngModel.indexOf(file);
                            scope.ngModel.splice(index, 1);
                        } else {
                            scope.ngModel = null;
                        }
                    };

                    if (scope.multiple) {
                        ctrl.$isEmpty = function (value) {
                            return !value || value.length === 0;
                        };
                    }
                }
            };
        }
    };
};
