import * as _ from 'lodash';
import * as angular from 'angular';
import {countries} from '../../../countries';
import UserRepresentation = bf.UserRepresentation;
import LanguageRelationRepresentation = bf.LanguageRelationRepresentation;

class StudentSkillsController {
    private separatorKeys: Array<string>;
    private student: UserRepresentation;
    private locationType: LocationType;
    private countries = countries;

    /** @ngInject */
    constructor(private Restangular: Restangular.IService, private $mdConstant: any, private definitions: any) {
        this.separatorKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
    }

    $onInit() {
        if (this.student.languages.length < 1) {
            this.student.languages.push(<LanguageRelationRepresentation>{language: undefined});
        }
        this.student.proximity = this.student.proximity || 'TO_200';
        if (this.student.anywhere) {
            this.locationType = 'ANYWHERE';
        } else {
            this.locationType = this.student.country ? 'COUNTRY' : 'CITY';
        }
    }

    addLanguage(language: LanguageRelationRepresentation) {
        const idx = this.student.languages.indexOf(language);
        this.student.languages.splice(idx + 1, 0, <LanguageRelationRepresentation>{language: undefined});
    }

    removeLanguage(language: LanguageRelationRepresentation) {
        const idx = this.student.languages.indexOf(language);
        this.student.languages.splice(idx, 1);
    }

    lookupTags(text: string) {
        const exclusions: Array<string> = this.student.tags.map(t => t.tag.name);
        return this.Restangular.all('tags').getList({searchTerm: text, exclusions})
            .then((tags: Restangular.ICollection) => tags.plain());
    }

    transformTag(chip: any) {
        if (angular.isObject(chip)) {
            return {tag: _.pick(chip, ['id', 'name'])};
        }
        return {tag: {name: chip}};
    }

    lookupInterests(text: string) {
        const exclusions: Array<string> = this.student.interests.map(t => t.interest.name);
        return this.Restangular.all('interests').getList({searchTerm: text, exclusions})
            .then((tags: Restangular.ICollection) => tags.plain());
    }

    transformInterest(chip: any) {
        if (angular.isObject(chip)) {
            return {interest: _.pick(chip, ['id', 'name'])};
        }
        return {interest: {name: chip}};
    }

    locationTypeChanged(locationType: LocationType) {
        this.student.anywhere = locationType === 'ANYWHERE';
        this.student.country = !this.student.anywhere && locationType === 'COUNTRY';
        this.student.locations = [];
        this.student.proximity = null;
    };

    lookupCountries(searchText: string) {
        searchText = searchText.toLowerCase();
        return this.countries.filter(c => c.name.toLowerCase().startsWith(searchText));
    }
}

export const StudentSkills = {
    template: require('./student-skills.html'),
    bindings: {
        student: '=',
        form: '<',
        wizardType: '@'
    },
    controller: StudentSkillsController
};

type LocationType = 'ANYWHERE' | 'COUNTRY' | 'CITY';
