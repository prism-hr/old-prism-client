/** @ngInject */
export class FileConversionService {
    constructor(Upload, Restangular) {
        this.Upload = Upload;
        this.Restangular = Restangular;
    }

    processForDisplay(object) {
        const documentsUrl = this.Restangular.one('public').all('documents').getRestangularUrl();

        function processData(obj) {
            for (const key of Object.keys(obj)) {
                const value = obj[key];
                if (value instanceof Object) {
                    if (value.fileName && value.fileType) {
                        value.$ngfBlobUrl = documentsUrl + '/' + value.accessCode;
                        value.type = value.fileType;
                    } else {
                        processData(value);
                    }
                }
            }
        }

        processData(object);
        return object;
    }

    processForUpload(object) {
        function processData(obj) {
            if (obj.$ngfBlobUrl) {
                delete obj.$ngfBlobUrl;
                delete obj.type;
                return;
            }

            for (const key of Object.keys(obj)) {
                const value = obj[key];
                if (value instanceof Object) {
                    processData(value);
                }
            }
        }

        processData(object);
        return object;
    }
}

