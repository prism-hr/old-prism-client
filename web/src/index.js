import angular from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-google-maps';
import 'angular-loading-bar';
import 'angular-messages';
import 'angular-material';
import 'angular-sanitize';
import 'angular-simple-logger';
import 'angular-socialshare';
import 'angular-translate';
import 'angular-translate-loader-static-files';
import 'lodash';
import 'ng-file-upload';
import 'restangular';
import 'textAngular';
import 'angular-ui-router';
import 'angular-recaptcha';
import 'satellizer';
import 'rx-angular';
import 'textangular/dist/textAngular-sanitize.min';
import 'ng-img-crop-full-extended/compile/minified/ng-img-crop';
import routes from './routes';
import {
    translateConfig,
    templateCacheConfig,
    satellizerConfig,
    restangularConfig,
    generalRun
} from './app/configuration/general.config';
import {materialConfig} from './app/configuration/material.config';
import {serverInterceptorConfig} from './app/configuration/server-interceptor.config';
import {authenticationHook} from './app/unauthenticated/authentication.hook';
import {definitionsLoadHook} from './app/general/definitions-load.hook';
import {ActivationService} from './app/unauthenticated/activity.service';
import {AuthService} from './app/unauthenticated/auth.service';
import {DefinitionsService} from './app/general/definitions.service';
import {resourceManagerFactory} from './app/create/resource-manager.factory';
import {ResourceCreateWizardFactory} from './app/create/resource-create-wizard.factory';
import {resourceCreateWizardStepHook} from './app/create/resource-create-wizard-step.hook';
import {ApplicationLoader} from './app/directives/application-loader';
import {PlaceAutocomplete} from './app/directives/place-autocomplete';
import {ImageSrc} from './app/directives/image-src';
import {Dialog} from './app/general/dialog/dialog';
import {browserTitleHook} from './app/general/browser-title.hook';
import {Welcome} from './app/welcome/welcome';
import {MotivationCheck} from './app/unauthenticated/motivation-check';
import {Authenticate} from './app/unauthenticated/authenticate/authenticate';
import {Header} from './app/general/header';
import {Sidebar} from './app/general/sidebar';
import {Activities} from './app/activities/activities';
import {Invited} from './app/unauthenticated/invited.component';
import {DepartmentWelcome} from './app/create/department/department-welcome';
import {PromoterWelcome} from './app/create/promoter/promoter-welcome';
import {Organization} from './app/create/organization/organization';
import {OrganizationSummary} from './app/create/organization/organization-summary';
import {OrganizationDetails} from './app/create/organization/organization-details';
import {OrganizationDescription} from './app/create/organization/organization-description';
import {OrganizationPreview} from './app/create/organization/organization-preview';
import {OrganizationPreviewBox} from './app/create/organization/organization-preview-box';
import {Advert} from './app/create/advert/advert';
import {AdvertCategory} from './app/create/advert/advert-category';
import {AdvertType} from './app/create/advert/advert-type';
import {AdvertHeader} from './app/create/advert/advert-header';
import {AdvertSalary} from './app/create/advert/advert-salary';
import {AdvertDetails} from './app/create/advert/advert-details';
import {AdvertAudience} from './app/create/advert/advert-audience';
import {AdvertPreview} from './app/create/advert/advert-preview';
import {EmployerView} from './app/view/employer/employer-view';
import {PositionView} from './app/view/position/position-view';
import {StudentWelcome} from './app/create/student/student-welcome';
import {StudentHeader} from './app/create/student/student-header';
import {StudentStudies} from './app/create/student/student-studies';
import {StudentContact} from './app/create/student/student-contact';
import {StudentSkills} from './app/create/student/student-skills';
import {StudentAbout} from './app/create/student/student-about';
import {StudentPreview} from './app/create/student/student-preview';
import {Student} from './app/create/student/student';
import './index.scss';
import environment from './env.json';

angular
    .module('prismWeb', [
        'ui.router',
        'ngMessages',
        'ngMaterial',
        'ngSanitize',
        'restangular',
        'vcRecaptcha',
        'ngFileUpload',
        'ngImgCrop',
        'satellizer',
        '720kb.socialshare',
        'angular-loading-bar',
        'ngAnimate',
        'textAngular',
        'pascalprecht.translate',
        'uiGmapgoogle-maps',
        'rx'
    ])
    .constant('environment', environment[ENVIRONMENT])
    .config(routes)
    .config(restangularConfig)
    .config(satellizerConfig)
    .config(translateConfig)
    .config(materialConfig)
    .config(serverInterceptorConfig)
    .service('ActivationService', ActivationService)
    .service('AuthService', AuthService)
    .service('resourceManagerFactory', resourceManagerFactory)
    .service('definitions', DefinitionsService)
    .provider('resourceCreateWizardFactory', ResourceCreateWizardFactory)
    .run(authenticationHook)
    .run(browserTitleHook)
    .run(resourceCreateWizardStepHook)
    .run(definitionsLoadHook)
    .run(generalRun)
    .run(templateCacheConfig)
    .directive('applicationLoader', ApplicationLoader)
    .directive('placeAutocomplete', PlaceAutocomplete)
    .directive('imageSrc', ImageSrc)
    .component('prismDialog', Dialog)
    .component('welcome', Welcome)
    .component('prismHeader', Header)
    .component('sidebar', Sidebar)
    .component('authenticate', Authenticate)
    .component('motivationCheck', MotivationCheck)
    .component('departmentWelcome', DepartmentWelcome)
    .component('promoterWelcome', PromoterWelcome)
    .component('organization', Organization)
    .component('organizationSummary', OrganizationSummary)
    .component('organizationDetails', OrganizationDetails)
    .component('organizationDescription', OrganizationDescription)
    .component('organizationPreview', OrganizationPreview)
    .component('organizationPreviewBox', OrganizationPreviewBox)
    .component('advert', Advert)
    .component('advertCategory', AdvertCategory)
    .component('advertType', AdvertType)
    .component('advertHeader', AdvertHeader)
    .component('advertSalary', AdvertSalary)
    .component('advertDetails', AdvertDetails)
    .component('advertAudience', AdvertAudience)
    .component('advertPreview', AdvertPreview)
    .component('employerView', EmployerView)
    .component('positionView', PositionView)
    .component('studentWelcome', StudentWelcome)
    .component('student', Student)
    .component('studentHeader', StudentHeader)
    .component('studentStudies', StudentStudies)
    .component('studentContact', StudentContact)
    .component('studentSkills', StudentSkills)
    .component('studentAbout', StudentAbout)
    .component('studentPreview', StudentPreview)
    .component('activities', Activities)
    .component('invited', Invited);

