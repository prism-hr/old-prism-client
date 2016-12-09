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
import {UserSessionService} from './app/unauthenticated/user-session.service';
import {AuthService} from './app/unauthenticated/auth.service';
import {DefinitionsService} from './app/general/definitions.service';
import {CheckboxesHelper} from './app/general/checkboxes.helper';
import {ResourceManagerFactory} from './app/create/resource-manager.factory';
import {UserManagerFactory} from './app/create/user-manager.factory';
import {WelcomeService} from './app/welcome/welcome.service';
import {ResourceCreateWizardFactory} from './app/create/resource-create-wizard.factory';
import {resourceCreateWizardStepHook} from './app/create/resource-create-wizard-step.hook';
import {ApplicationLoader} from './app/directives/application-loader';
import {NgCroppie} from './app/directives/ng-croppie';
import {BackgroundUploader} from './app/directives/background-uploader';
import {HttpPrefix} from './app/directives/http-prefix';
import {LogoUploader} from './app/directives/logo-uploader';
import {PlaceAutocomplete} from './app/directives/place-autocomplete';
import {Dialog} from './app/general/dialog/dialog';
import {browserTitleHook} from './app/general/browser-title.hook';
import {MotivationCheck} from './app/unauthenticated/motivation-check';
import {Authenticate} from './app/unauthenticated/authenticate/authenticate';
import {Header} from './app/general/header';
import {Sidebar} from './app/general/sidebar';
import {Activities} from './app/activities/activities';
import {Welcome} from './app/welcome/welcome';
import {WelcomeWizardEntry} from './app/welcome/welcome-wizard-entry';
import {DepartmentWelcome} from './app/welcome/department/department-welcome';
import {PromoterWelcome} from './app/welcome/promoter/promoter-welcome';
import {PromoterNew} from './app/new/promoter/promoter-new';
import {StudentWelcome} from './app/welcome/student/student-welcome';
import {WizardNavigation} from './app/create/wizard-navigation';
import {WizardButtons} from './app/create/wizard-buttons';
import {WizardHeader} from './app/create/wizard-header';
import {OrganizationLookup} from './app/create/organization-lookup';
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
import {Language} from './app/create/student/language';
import {Student} from './app/create/student/student';
import {StudentPreviewBox} from './app/create/student/student-preview-box';
import {StudentHeader} from './app/create/student/student-header';
import {StudentQualifications} from './app/create/student/student-qualifications';
import {OrganizationQualificationDetails} from './app/create/student/qualification/organization-qualification-details';
import {StudentEditQualificationService} from './app/create/student/qualification/student-edit-qualification-service';
import {StudentEditQualification} from './app/create/student/qualification/student-edit-qualification';
import {StudentEditQualificationButtons} from './app/create/student/qualification/student-edit-qualification-buttons';
import {StudentContact} from './app/create/student/student-contact';
import {StudentSkills} from './app/create/student/student-skills';
import {StudentAbout} from './app/create/student/student-about';
import {PromoterView} from './app/view/promoter/promoter-view';
import {DepartmentView} from './app/view/department/department-view';
import {AdvertView} from './app/view/advert/advert-view';
import {AdvertViewHeader} from './app/view/advert/advert-view-header';
import {StudentView} from './app/view/student/student-view';
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
    .service('userSessionService', UserSessionService)
    .service('authService', AuthService)
    .service('resourceManagerFactory', ResourceManagerFactory)
    .service('userManagerFactory', UserManagerFactory)
    .service('welcomeService', WelcomeService)
    .service('definitions', DefinitionsService)
    .service('checkboxesHelper', CheckboxesHelper)
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
    .directive('httpPrefix', HttpPrefix)
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
    .component('promoterNew', PromoterNew)
    .component('studentWelcome', StudentWelcome)
    .component('wizardNavigation', WizardNavigation)
    .component('wizardButtons', WizardButtons)
    .component('wizardHeader', WizardHeader)
    .component('organizationLookup', OrganizationLookup)
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
    .component('language', Language)
    .component('student', Student)
    .component('studentPreviewBox', StudentPreviewBox)
    .component('studentHeader', StudentHeader)
    .component('studentQualifications', StudentQualifications)
    .component('organizationQualificationDetails', OrganizationQualificationDetails)
    .service('studentEditQualificationService', StudentEditQualificationService)
    .component('studentEditQualification', StudentEditQualification)
    .component('studentEditQualificationButtons', StudentEditQualificationButtons)
    .component('studentContact', StudentContact)
    .component('studentSkills', StudentSkills)
    .component('studentAbout', StudentAbout)
    .component('promoterView', PromoterView)
    .component('departmentView', DepartmentView)
    .component('advertView', AdvertView)
    .component('advertViewHeader', AdvertViewHeader)
    .component('studentView', StudentView)
    .component('activities', Activities);
