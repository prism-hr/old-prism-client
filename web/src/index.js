import moment from 'moment';
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
import 'angular-cloudinary';
import routes from './routes';
import {
    translateConfig,
    templateCacheConfig,
    satellizerConfig,
    restangularConfig,
    generalRun,
    cloudinaryConfig
} from './app/configuration/general.config';
import {materialConfig} from './app/configuration/material.config';
import {serverInterceptorConfig} from './app/configuration/server-interceptor.config';
import {authenticationHook} from './app/unauthenticated/authentication.hook';
import {definitionsLoadHook} from './app/general/definitions-load.hook';
import {ActivityService} from './app/unauthenticated/activity.service';
import {AuthService} from './app/unauthenticated/auth.service';
import {DefinitionsService} from './app/general/definitions.service';
import {resourceManagerFactory} from './app/create/resource-manager.factory';
import {WelcomeService} from './app/welcome/welcome.service';
import {ResourceCreateWizardFactory} from './app/create/resource-create-wizard.factory';
import {resourceCreateWizardStepHook} from './app/create/resource-create-wizard-step.hook';
import {ApplicationLoader} from './app/directives/application-loader';
import {NgCroppie} from './app/directives/ng-croppie';
import {BackgroundUploader} from './app/directives/background-uploader';
import {LogoUploader} from './app/directives/logo-uploader';
import {PlaceAutocomplete} from './app/directives/place-autocomplete';
import {Dialog} from './app/general/dialog/dialog';
import {browserTitleHook} from './app/general/browser-title.hook';
import {MotivationCheck} from './app/unauthenticated/motivation-check';
import {Authenticate} from './app/unauthenticated/authenticate/authenticate';
import {Header} from './app/general/header';
import {Sidebar} from './app/general/sidebar';
import {Activities} from './app/activities/activities';
import {Invited} from './app/unauthenticated/invited.component';
import {Welcome} from './app/welcome/welcome';
import {WelcomeWizardEntry} from './app/welcome/welcome-wizard-entry';
import {DepartmentWelcome} from './app/welcome/department/department-welcome';
import {PromoterWelcome} from './app/welcome/promoter/promoter-welcome';
import {WizardNavigation} from './app/create/wizard-navigation';
import {WizardButtons} from './app/create/wizard-buttons';
import {Organization} from './app/create/organization/organization';
import {OrganizationPreviewBox} from './app/create/organization/organization-preview-box';
import {OrganizationSummary} from './app/create/organization/organization-summary';
import {OrganizationDetails} from './app/create/organization/organization-details';
import {OrganizationDescription} from './app/create/organization/organization-description';
import {Advert} from './app/create/advert/advert';
import {AdvertPreviewBox} from './app/create/advert/advert-preview-box';
import {AdvertSummary} from './app/create/advert/advert-summary';
import {AdvertType} from './app/create/advert/advert-type';
import {AdvertHeader} from './app/create/advert/advert-header';
import {AdvertSalary} from './app/create/advert/advert-salary';
import {AdvertRecruiter} from './app/create/advert/advert-recruiter';
import {AdvertDetails} from './app/create/advert/advert-details';
import {AdvertCandidate} from './app/create/advert/advert-candidate';
import {Audience} from './app/create/audience/audience';
import {AudienceSummary} from './app/create/audience/audience-summary';
import {AudienceSocial} from './app/create/audience/audience-social';
import {EmployerView} from './app/view/employer/employer-view';
import {PositionView} from './app/view/position/position-view';
import {StudentView} from './app/view/student/student-view';
import {StudentWelcome} from './app/welcome/student/student-welcome';
import {StudentHeader} from './app/welcome/student/student-header';
import {StudentStudies} from './app/welcome/student/student-studies';
import {StudentContact} from './app/welcome/student/student-contact';
import {StudentSkills} from './app/welcome/student/student-skills';
import {StudentAbout} from './app/welcome/student/student-about';
import {Student} from './app/welcome/student/student';
import './index.scss';
import environment from './env.json';

const locale = window.navigator.userLanguage || window.navigator.language;
moment.locale(locale);

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
        'rx',
        'angular-cloudinary'
    ])
    .constant('environment', environment[ENVIRONMENT])
    .config(routes)
    .config(restangularConfig)
    .config(satellizerConfig)
    .config(translateConfig)
    .config(cloudinaryConfig)
    .config(materialConfig)
    .config(serverInterceptorConfig)
    .service('activityService', ActivityService)
    .service('authService', AuthService)
    .service('resourceManagerFactory', resourceManagerFactory)
    .service('welcomeService', WelcomeService)
    .service('definitions', DefinitionsService)
    .provider('resourceCreateWizardFactory', ResourceCreateWizardFactory)
    .run(authenticationHook)
    .run(browserTitleHook)
    .run(resourceCreateWizardStepHook)
    .run(definitionsLoadHook)
    .run(generalRun)
    .run(templateCacheConfig)
    .directive('applicationLoader', ApplicationLoader)
    .directive('ngCroppie', NgCroppie)
    .directive('backgroundUploader', BackgroundUploader)
    .directive('logoUploader', LogoUploader)
    .directive('placeAutocomplete', PlaceAutocomplete)
    .component('prismDialog', Dialog)
    .component('welcome', Welcome)
    .component('prismHeader', Header)
    .component('sidebar', Sidebar)
    .component('authenticate', Authenticate)
    .component('motivationCheck', MotivationCheck)
    .component('welcomeWizardEntry', WelcomeWizardEntry)
    .component('departmentWelcome', DepartmentWelcome)
    .component('promoterWelcome', PromoterWelcome)
    .component('wizardNavigation', WizardNavigation)
    .component('wizardButtons', WizardButtons)
    .component('organization', Organization)
    .component('organizationPreviewBox', OrganizationPreviewBox)
    .component('organizationSummary', OrganizationSummary)
    .component('organizationDetails', OrganizationDetails)
    .component('organizationDescription', OrganizationDescription)
    .component('advert', Advert)
    .component('advertPreviewBox', AdvertPreviewBox)
    .component('advertSummary', AdvertSummary)
    .component('advertRecruiter', AdvertRecruiter)
    .component('advertType', AdvertType)
    .component('advertHeader', AdvertHeader)
    .component('advertSalary', AdvertSalary)
    .component('advertDetails', AdvertDetails)
    .component('advertCandidate', AdvertCandidate)
    .component('audience', Audience)
    .component('audienceSummary', AudienceSummary)
    .component('audienceSocial', AudienceSocial)
    .component('employerView', EmployerView)
    .component('positionView', PositionView)
    .component('studentView', StudentView)
    .component('studentWelcome', StudentWelcome)
    .component('student', Student)
    .component('studentHeader', StudentHeader)
    .component('studentStudies', StudentStudies)
    .component('studentContact', StudentContact)
    .component('studentSkills', StudentSkills)
    .component('studentAbout', StudentAbout)
    .component('activities', Activities)
    .component('invited', Invited);

