// Generated using typescript-generator version 1.14.251 on 2016-12-21 13:16:35.

declare namespace bf {

    interface OrganizationImplementationRepresentation extends TaggableReferrableQualifiableRepresentation, OrganizationImplementationDefinition<OrganizationImplementationRepresentation, PromotionRepresentation, UserRepresentation, DocumentRepresentation, TagRelationRepresentation, LocationRelationRepresentation, LanguageRelationRepresentation, QualificationCategoryRepresentation, PlanRepresentation, OrganizationRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
        organizationImplementationReferrer: OrganizationImplementationRepresentation;
        promotionReferrer: PromotionRepresentation;
        userReferrer: UserRepresentation;
        documentBackgroundImage: DocumentRepresentation;
        tags: TagRelationRepresentation[];
        locations: LocationRelationRepresentation[];
        languages: LanguageRelationRepresentation[];
        qualificationCategories: QualificationCategoryRepresentation[];
        plans: PlanRepresentation[];
        organization: OrganizationRepresentation;
        documentLogoImage: DocumentRepresentation;
    }

    interface OrganizationImplementationDTO extends TaggableReferrableQualifiableDTO, OrganizationImplementationDefinition<OrganizationImplementationDTO, PromotionDTO, UserDTO, DocumentDTO, TagRelationDTO, LocationRelationDTO, LanguageRelationDTO, QualificationCategoryDTO, PlanDTO, OrganizationDTO> {
        organizationImplementationReferrer: OrganizationImplementationDTO;
        promotionReferrer: PromotionDTO;
        userReferrer: UserDTO;
        documentBackgroundImage: DocumentDTO;
        tags: TagRelationDTO[];
        locations: LocationRelationDTO[];
        languages: LanguageRelationDTO[];
        qualificationCategories: QualificationCategoryDTO[];
        plans: PlanDTO[];
        organization: OrganizationDTO;
        documentLogoImage: DocumentDTO;
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface UserRepresentation extends TaggableReferrableRepresentation<PrismUserState>, UserDefinition<OrganizationImplementationRepresentation, PromotionRepresentation, UserRepresentation, DocumentRepresentation, TagRelationRepresentation, LocationRelationRepresentation, LanguageRelationRepresentation, UserQualificationRepresentation, UserExperienceRepresentation, UserRefereeRepresentation, UserInterestRepresentation, UserRoleRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
        organizationImplementationReferrer: OrganizationImplementationRepresentation;
        promotionReferrer: PromotionRepresentation;
        userReferrer: UserRepresentation;
        documentBackgroundImage: DocumentRepresentation;
        tags: TagRelationRepresentation[];
        locations: LocationRelationRepresentation[];
        languages: LanguageRelationRepresentation[];
        documentPortraitImage: DocumentRepresentation;
        documentResume: DocumentRepresentation;
        state: PrismUserState;
        userQualifications: UserQualificationRepresentation[];
        userExperiences: UserExperienceRepresentation[];
        userReferees: UserRefereeRepresentation[];
        interests: UserInterestRepresentation[];
        userRoles: UserRoleRepresentation[];
    }

    interface PromotionRepresentation extends TaggableReferrableQualifiableRepresentation, PromotionDefinition<OrganizationImplementationRepresentation, PromotionRepresentation, UserRepresentation, DocumentRepresentation, TagRelationRepresentation, LocationRelationRepresentation, LanguageRelationRepresentation, QualificationCategoryRepresentation, PlanRepresentation, ContactRepresentation, DocumentRelationRepresentation, PromotionPositionWorkPatternRepresentation, PromotionPositionBenefitRepresentation, PromotionOrganizationImplementationRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
        organizationImplementationReferrer: OrganizationImplementationRepresentation;
        promotionReferrer: PromotionRepresentation;
        userReferrer: UserRepresentation;
        documentBackgroundImage: DocumentRepresentation;
        tags: TagRelationRepresentation[];
        locations: LocationRelationRepresentation[];
        languages: LanguageRelationRepresentation[];
        state: PrismContentState;
        qualificationCategories: QualificationCategoryRepresentation[];
        plans: PlanRepresentation[];
        organizationImplementation: OrganizationImplementationRepresentation;
        organizationImplementationOwner: OrganizationImplementationRepresentation;
        contact: ContactRepresentation;
        documentApply: DocumentRepresentation;
        countActivity: number;
        timestampLatestActivity: string;
        countReferral: number;
        timestampLatestReferral: string;
        countView: number;
        timestampLatestView: string;
        countResponse: number;
        timestampLatestResponse: string;
        documents: DocumentRelationRepresentation[];
        positionWorkPatterns: PromotionPositionWorkPatternRepresentation[];
        positionBenefits: PromotionPositionBenefitRepresentation[];
        promotionOrganizationImplementations: PromotionOrganizationImplementationRepresentation[];
        organizationImplementationDisplay: OrganizationImplementationRepresentation;
    }

    interface DocumentRepresentation extends EntityRepresentation, DocumentDefinition<UserRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
    }

    interface TagRelationRepresentation extends EntityRepresentation, TagRelationDefinition<TagRepresentation, UserRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
        tag: TagRepresentation;
    }

    interface LocationRelationRepresentation extends EntityRepresentation, LocationRelationDefinition<LocationRepresentation, UserRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
        location: LocationRepresentation;
    }

    interface LanguageRelationRepresentation extends EntityRepresentation, LanguageRelationDefinition<TagRepresentation, UserRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
        language: TagRepresentation;
    }

    interface QualificationCategoryRepresentation extends EntityRepresentation, QualificationCategoryDefinition<UserRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
    }

    interface PlanRepresentation extends EntityRepresentation, PlanDefinition<UserRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
    }

    interface OrganizationRepresentation extends EntityRepresentation, OrganizationDefinition<DocumentRepresentation, OrganizationImplementationRepresentation, UserRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
        documentLogoImage: DocumentRepresentation;
        organizationImplementation: OrganizationImplementationRepresentation;
    }

    interface TaggableReferrableQualifiableRepresentation extends TaggableReferrableRepresentation<PrismContentState>, TaggableReferrableQualifiableDefinition<OrganizationImplementationRepresentation, PromotionRepresentation, UserRepresentation, DocumentRepresentation, TagRelationRepresentation, LocationRelationRepresentation, LanguageRelationRepresentation, QualificationCategoryRepresentation, PlanRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
        organizationImplementationReferrer: OrganizationImplementationRepresentation;
        promotionReferrer: PromotionRepresentation;
        userReferrer: UserRepresentation;
        documentBackgroundImage: DocumentRepresentation;
        tags: TagRelationRepresentation[];
        locations: LocationRelationRepresentation[];
        languages: LanguageRelationRepresentation[];
        state: PrismContentState;
        qualificationCategories: QualificationCategoryRepresentation[];
        plans: PlanRepresentation[];
        context: string;
    }

    interface PromotionDTO extends TaggableReferrableQualifiableDTO, PromotionDefinition<OrganizationImplementationDTO, PromotionDTO, UserDTO, DocumentDTO, TagRelationDTO, LocationRelationDTO, LanguageRelationDTO, QualificationCategoryDTO, PlanDTO, ContactDTO, DocumentRelationDTO, PromotionPositionWorkPatternDTO, PromotionPositionBenefitDTO, PromotionOrganizationImplementationDTO> {
        organizationImplementationReferrer: OrganizationImplementationDTO;
        promotionReferrer: PromotionDTO;
        userReferrer: UserDTO;
        documentBackgroundImage: DocumentDTO;
        tags: TagRelationDTO[];
        locations: LocationRelationDTO[];
        languages: LanguageRelationDTO[];
        state: PrismContentState;
        qualificationCategories: QualificationCategoryDTO[];
        plans: PlanDTO[];
        organizationImplementation: OrganizationImplementationDTO;
        organizationImplementationOwner: OrganizationImplementationDTO;
        contact: ContactDTO;
        documentApply: DocumentDTO;
        documents: DocumentRelationDTO[];
        positionWorkPatterns: PromotionPositionWorkPatternDTO[];
        positionBenefits: PromotionPositionBenefitDTO[];
        promotionOrganizationImplementations: PromotionOrganizationImplementationDTO[];
        addSuggestedPromotionOrganizationImplementations: boolean;
        organizationImplementations: OrganizationImplementationDTO[];
        organizationImplementationDisplay: OrganizationImplementationDTO;
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface UserDTO extends TaggableReferrableDTO<PrismUserState>, UserDefinition<OrganizationImplementationDTO, PromotionDTO, UserDTO, DocumentDTO, TagRelationDTO, LocationRelationDTO, LanguageRelationDTO, UserQualificationDTO, UserExperienceDTO, UserRefereeDTO, UserInterestDTO, UserRoleDTO> {
        organizationImplementationReferrer: OrganizationImplementationDTO;
        promotionReferrer: PromotionDTO;
        userReferrer: UserDTO;
        documentBackgroundImage: DocumentDTO;
        tags: TagRelationDTO[];
        locations: LocationRelationDTO[];
        languages: LanguageRelationDTO[];
        captchaResponse: string;
        password: string;
        documentPortraitImage: DocumentDTO;
        documentResume: DocumentDTO;
        userQualifications: UserQualificationDTO[];
        userExperiences: UserExperienceDTO[];
        userReferees: UserRefereeDTO[];
        interests: UserInterestDTO[];
        userRoles: UserRoleDTO[];
        userCreate: UserDTO;
        userUpdate: UserDTO;
        provider: PrismOauthProvider;
        clientId: string;
        code: string;
        redirectUri: string;
        userState: PrismUserState;
    }

    interface DocumentDTO extends EntityDTO, DocumentDefinition<UserDTO> {
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface EntityDTO extends EntityDefinition<UserDTO> {
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface TagRelationDTO extends EntityDTO, TagRelationDefinition<TagDTO, UserDTO> {
        tag: TagDTO;
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface LocationRelationDTO extends EntityDTO, LocationRelationDefinition<LocationDTO, UserDTO> {
        location: LocationDTO;
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface LanguageRelationDTO extends EntityDTO, LanguageRelationDefinition<TagDTO, UserDTO> {
        language: TagDTO;
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface QualificationCategoryDTO extends EntityDTO, QualificationCategoryDefinition<UserDTO> {
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface PlanDTO extends EntityDTO, PlanDefinition<UserDTO> {
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface OrganizationDTO extends EntityDTO, OrganizationDefinition<DocumentDTO, OrganizationImplementationDTO, UserDTO> {
        documentLogoImage: DocumentDTO;
        organizationImplementation: OrganizationImplementationDTO;
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface TaggableReferrableQualifiableDTO extends TaggableReferrableDTO<PrismContentState>, TaggableReferrableQualifiableDefinition<OrganizationImplementationDTO, PromotionDTO, UserDTO, DocumentDTO, TagRelationDTO, LocationRelationDTO, LanguageRelationDTO, QualificationCategoryDTO, PlanDTO> {
        organizationImplementationReferrer: OrganizationImplementationDTO;
        promotionReferrer: PromotionDTO;
        userReferrer: UserDTO;
        documentBackgroundImage: DocumentDTO;
        tags: TagRelationDTO[];
        locations: LocationRelationDTO[];
        languages: LanguageRelationDTO[];
        state: PrismContentState;
        qualificationCategories: QualificationCategoryDTO[];
        plans: PlanDTO[];
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface UserQualificationRepresentation extends EntityRepresentation, UserQualificationDefinition<OrganizationImplementationQualificationRepresentation, UserRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
        organizationImplementationQualification: OrganizationImplementationQualificationRepresentation;
    }

    interface UserExperienceRepresentation extends EntityRepresentation, UserExperienceDefinition<OrganizationImplementationExperienceRepresentation, UserRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
        organizationImplementationExperience: OrganizationImplementationExperienceRepresentation;
    }

    interface UserRefereeRepresentation extends EntityRepresentation, UserRefereeDefinition<ContactRepresentation, OrganizationImplementationExperienceRepresentation, UserRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
        contact: ContactRepresentation;
        organizationImplementationExperience: OrganizationImplementationExperienceRepresentation;
    }

    interface UserInterestRepresentation extends EntityRepresentation, UserInterestDefinition<TagRepresentation, UserRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
        interest: TagRepresentation;
    }

    interface UserRoleRepresentation extends EntityRepresentation, UserRoleDefinition<OrganizationImplementationRepresentation, UserRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
        organizationImplementation: OrganizationImplementationRepresentation;
        user: UserRepresentation;
    }

    interface ContactRepresentation extends ContactDefinition, Comparable<ContactRepresentation> {
        documentPortraitImage: DocumentRepresentation;
    }

    interface DocumentRelationRepresentation extends EntityRepresentation, DocumentRelationDefinition<DocumentRepresentation, UserRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
        document: DocumentRepresentation;
    }

    interface PromotionPositionWorkPatternRepresentation extends EntityRepresentation, PromotionPositionWorkPatternDefinition<UserRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
    }

    interface PromotionPositionBenefitRepresentation extends EntityRepresentation, PromotionPositionBenefitDefinition<TagRepresentation, UserRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
        positionBenefit: TagRepresentation;
    }

    interface PromotionOrganizationImplementationRepresentation extends EntityRepresentation, PromotionOrganizationImplementationDefinition<PromotionRepresentation, OrganizationImplementationRepresentation, UserRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
        id: number;
        promotion: PromotionRepresentation;
        organizationImplementation: OrganizationImplementationRepresentation;
    }

    interface EntityRepresentation extends EntityDefinition<UserRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
    }

    interface TagRepresentation extends EntityRepresentation, TagDefinition<UserRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
        countOrganizationImplementation: number;
        totalStaffNumber: number;
        totalStudentNumber: number;
        countPromotion: number;
        countUser: number;
    }

    interface LocationRepresentation extends EntityRepresentation, LocationDefinition<UserRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
    }

    interface OrganizationImplementationDefinition<T, U, V, W, X, Y, Z, A, B, C> extends TaggableReferrableQualifiableDefinition<T, U, V, W, X, Y, Z, A, B> {
        id: number;
        state: PrismContentState;
        organization: C;
        documentLogoImage: W;
        website: string;
        numberStaff: PrismNumberStaff;
        numberStudent: PrismNumberStudent;
    }

    interface ContactDTO extends ContactDefinition {
    }

    interface DocumentRelationDTO extends EntityDTO, DocumentRelationDefinition<DocumentDTO, UserDTO> {
        document: DocumentDTO;
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface PromotionPositionWorkPatternDTO extends EntityDTO, PromotionPositionWorkPatternDefinition<UserDTO> {
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface PromotionPositionBenefitDTO extends EntityDTO, PromotionPositionBenefitDefinition<TagDTO, UserDTO> {
        positionBenefit: TagDTO;
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface PromotionOrganizationImplementationDTO extends EntityDTO, PromotionOrganizationImplementationDefinition<PromotionDTO, OrganizationImplementationDTO, UserDTO> {
        promotion: PromotionDTO;
        organizationImplementation: OrganizationImplementationDTO;
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface UserQualificationDTO extends EntityDTO, UserQualificationDefinition<OrganizationImplementationQualificationDTO, UserDTO> {
        organizationImplementationQualification: OrganizationImplementationQualificationDTO;
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface UserExperienceDTO extends UserDTO, UserExperienceDefinition<OrganizationImplementationExperienceDTO, UserDTO> {
        organizationImplementationExperience: OrganizationImplementationExperienceDTO;
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface UserRefereeDTO extends EntityDTO, UserRefereeDefinition<ContactDTO, OrganizationImplementationExperienceDTO, UserDTO> {
        contact: ContactDTO;
        organizationImplementationExperience: OrganizationImplementationExperienceDTO;
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface UserInterestDTO extends UserDTO, UserInterestDefinition<TagDTO, UserDTO> {
        interest: TagDTO;
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface UserRoleDTO extends EntityDTO, UserRoleDefinition<OrganizationImplementationDTO, UserDTO> {
        organizationImplementation: OrganizationImplementationDTO;
        user: UserDTO;
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface TagDTO extends EntityDTO, TagDefinition<UserDTO> {
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface LocationDTO extends EntityDTO, LocationDefinition<UserDTO> {
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface OrganizationImplementationQualificationRepresentation extends OrganizationImplementationExperienceRepresentation, OrganizationImplementationQualificationDefinition<OrganizationImplementationRepresentation, UserRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
        organizationImplementation: OrganizationImplementationRepresentation;
        grades: string[];
    }

    interface OrganizationImplementationExperienceRepresentation extends TaggableRepresentation, OrganizationImplementationExperienceDefinition<OrganizationImplementationRepresentation, UserRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
        organizationImplementation: OrganizationImplementationRepresentation;
    }

    interface TaggableReferrableRepresentation<T> extends TaggableRepresentation, TaggableReferrableDefinition<OrganizationImplementationRepresentation, PromotionRepresentation, UserRepresentation, DocumentRepresentation, T, TagRelationRepresentation, LocationRelationRepresentation, LanguageRelationRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
        organizationImplementationReferrer: OrganizationImplementationRepresentation;
        promotionReferrer: PromotionRepresentation;
        userReferrer: UserRepresentation;
        documentBackgroundImage: DocumentRepresentation;
        tags: TagRelationRepresentation[];
        locations: LocationRelationRepresentation[];
        languages: LanguageRelationRepresentation[];
    }

    interface UserDefinition<T, U, V, W, X, Y, Z, A, B, C, D, E> extends TaggableReferrableDefinition<T, U, V, W, PrismUserState, X, Y, Z> {
        country: boolean;
        username: string;
        oauthAccountId: string;
        documentPortraitImage: W;
        documentResume: W;
        userQualifications: A[];
        userExperiences: B[];
        mobile: string;
        proximity: PrismProximity;
        firstName: string;
        lastName: string;
        userReferees: C[];
        websiteResume: string;
        anywhere: boolean;
        oauthProvider: PrismOauthProvider;
        interests: D[];
        userRoles: E[];
    }

    interface ContactDefinition {
        enabled: boolean;
        email: string;
        mobile: string;
        firstName: string;
        lastName: string;
        fullName: string;
    }

    interface PromotionDefinition<T, U, V, W, X, Y, Z, A, B, C, D, E, F, G> extends TaggableReferrableQualifiableDefinition<T, U, V, W, X, Y, Z, A, B> {
        id: number;
        organizationImplementation: T;
        positionContract: PrismPositionContract;
        positionDurationMinimum: number;
        positionDurationMaximum: number;
        positionDurationInterval: PrismPositionInterval;
        positionSalary: PrismPositionSalary;
        positionSalaryCurrency: string;
        positionSalaryMinimum: number;
        positionSalaryMaximum: number;
        positionSalaryInterval: PrismPositionInterval;
        positionBenefitDescription: string;
        timestampPublicationStart: string;
        timestampPublicationClose: string;
        positionWorkPatterns: E[];
        positionBenefits: F[];
        organizationImplementations: T[];
        exclusive: boolean;
        contact: C;
        discloseOwner: boolean;
        category: PrismPromotionCategory;
        websiteApply: string;
        documentApply: W;
        documents: D[];
        languages: Z[];
        organizationImplementationOwner: T;
        promotionOrganizationImplementations: G[];
        organizationImplementationDisplay: T;
    }

    interface DocumentDefinition<T> extends EntityDefinition<T> {
        fileName: string;
        cloudinaryId: string;
        cloudinaryUrl: string;
    }

    interface TagRelationDefinition<T, U> extends EntityDefinition<U> {
        tag: T;
    }

    interface LocationRelationDefinition<T, U> extends EntityDefinition<U> {
        location: T;
    }

    interface LanguageRelationDefinition<T, U> extends EntityDefinition<U> {
        language: T;
        proficiency: PrismLanguageProficiency;
    }

    interface QualificationCategoryDefinition<T> extends EntityDefinition<T> {
        qualificationCategory: PrismQualificationCategory;
    }

    interface PlanDefinition<T> extends EntityDefinition<T> {
        name: string;
        subscription: string;
    }

    interface OrganizationDefinition<T, U, V> extends EntityDefinition<V> {
        name: string;
        documentLogoImage: T;
        organizationImplementation: U;
        locationList: string;
    }

    interface TaggableReferrableQualifiableDefinition<T, U, V, W, X, Y, Z, A, B> extends TaggableReferrableDefinition<T, U, V, W, PrismContentState, X, Y, Z> {
        name: string;
        actions: string[];
        qualificationCategories: A[];
        plans: B[];
    }

    interface OrganizationImplementationQualificationDTO extends OrganizationImplementationExperienceDTO, OrganizationImplementationQualificationDefinition<OrganizationImplementationDTO, UserDTO> {
        organizationImplementation: OrganizationImplementationDTO;
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface OrganizationImplementationExperienceDTO extends TaggableDTO, OrganizationImplementationExperienceDefinition<OrganizationImplementationDTO, UserDTO> {
        organizationImplementation: OrganizationImplementationDTO;
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface TaggableReferrableDTO<T> extends TaggableDTO, TaggableReferrableDefinition<OrganizationImplementationDTO, PromotionDTO, UserDTO, DocumentDTO, T, TagRelationDTO, LocationRelationDTO, LanguageRelationDTO> {
        organizationImplementationReferrer: OrganizationImplementationDTO;
        promotionReferrer: PromotionDTO;
        userReferrer: UserDTO;
        documentBackgroundImage: DocumentDTO;
        activityReferral: EntityDTO;
        tags: TagRelationDTO[];
        locations: LocationRelationDTO[];
        languages: LanguageRelationDTO[];
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface EntityDefinition<T> {
        timestampCreate: string;
        timestampUpdate: string;
        accessCode: string;
        userCreate: T;
        userUpdate: T;
    }

    interface UserQualificationDefinition<T, U> extends EntityDefinition<U> {
        nameProject: string;
        dateStart: string;
        dateAward: string;
        grade: string;
        current: boolean;
        awardMade: boolean;
        organizationImplementationQualification: T;
    }

    interface TaggableRepresentation extends EntityRepresentation, TaggableDefinition<UserRepresentation> {
        userCreate: UserRepresentation;
        userUpdate: UserRepresentation;
        tagsSuggested: string[];
    }

    interface UserExperienceDefinition<T, U> extends EntityDefinition<U> {
        description: string;
        dateStart: string;
        current: boolean;
        dateLeave: string;
        joinStaff: boolean;
        organizationImplementationExperience: T;
    }

    interface UserRefereeDefinition<T, U, V> extends EntityDefinition<V> {
        contact: T;
        joinStaff: boolean;
        organizationImplementationExperience: U;
    }

    interface UserInterestDefinition<T, U> extends EntityDefinition<U> {
        interest: T;
    }

    interface UserRoleDefinition<T, U> extends EntityDefinition<U> {
        state: PrismUserRoleState;
        role: PrismRole;
        user: U;
        organizationImplementation: T;
    }

    interface Comparable<T> {
    }

    interface DocumentRelationDefinition<T, U> extends EntityDefinition<U> {
        document: T;
    }

    interface PromotionPositionWorkPatternDefinition<T> extends EntityDefinition<T> {
        positionWorkPattern: PrismPositionWorkPattern;
    }

    interface PromotionPositionBenefitDefinition<T, U> extends EntityDefinition<U> {
        positionBenefit: T;
    }

    interface PromotionOrganizationImplementationDefinition<T, U, V> extends EntityDefinition<V> {
        state: PrismPromotionOrganizationImplementationState;
        organizationImplementation: U;
        relevanceScore: number;
        knowledgeScore: number;
        proximityScore: number;
        proximity: number;
        promotion: T;
        groupTagMatch: string;
        groupQualificationCategoryMatch: string;
    }

    interface TagDefinition<T> extends EntityDefinition<T> {
        name: string;
    }

    interface LocationDefinition<T> extends EntityDefinition<T> {
        name: string;
        category: PrismLocationCategory;
        domicile: string;
        googleId: string;
        latitude: number;
        longitude: number;
    }

    interface TaggableDTO extends EntityDTO, TaggableDefinition<UserDTO> {
        userCreate: UserDTO;
        userUpdate: UserDTO;
    }

    interface OrganizationImplementationQualificationDefinition<T, U> extends OrganizationImplementationExperienceDefinition<T, U> {
        category: PrismQualificationCategory;
        gradeList: string;
    }

    interface OrganizationImplementationExperienceDefinition<T, U> extends TaggableDefinition<U> {
        name: string;
        organizationImplementation: T;
    }

    interface TaggableReferrableDefinition<T, U, V, W, X, Y, Z, A> extends TaggableDefinition<V> {
        state: X;
        description: string;
        locations: Z[];
        promotionReferrer: U;
        documentBackgroundImage: W;
        qualificationCategoryCount: number;
        qualificationCategoryList: string;
        userReferrer: V;
        summary: string;
        tagCount: number;
        tagList: string;
        locationCount: number;
        locationList: string;
        stateComplete: string;
        tags: Y[];
        languages: A[];
        organizationImplementationReferrer: T;
    }

    interface TaggableDefinition<T> extends EntityDefinition<T> {
        addSuggestedTags: boolean;
        tagSuggestedList: string;
    }

    type PrismContentState = "DRAFT" | "ACCEPTED" | "REJECTED";

    type PrismNumberStaff = "FROM_1_TO_10" | "FROM_11_TO_50" | "FROM_51_TO_200" | "FROM_201_TO_500" | "FROM_501_TO_1000" | "FROM_1001_TO_5000" | "FROM_5001_TO_10000" | "FROM_10001_TO_ANY";

    type PrismNumberStudent = "FROM_1_TO_10" | "FROM_11_TO_50" | "FROM_51_TO_200" | "FROM_201_TO_500" | "FROM_501_TO_1000" | "FROM_1001_TO_ANY";

    type PrismOauthProvider = "FACEBOOK" | "LINKEDIN" | "TWITTER";

    type PrismProximity = "TO_10" | "TO_25" | "TO_50" | "TO_100" | "TO_200";

    type PrismUserState = "ACCEPTED" | "REJECTED" | "DISABLED";

    type PrismPromotionCategory = "EMPLOYMENT" | "PLACEMENT" | "EVENT";

    type PrismPositionContract = "PERMANENT" | "FIXED_TERM";

    type PrismPositionInterval = "HOUR" | "DAY" | "WEEK" | "MONTH" | "YEAR";

    type PrismPositionSalary = "RANGE" | "COMPETITIVE" | "NONE";

    type PrismLanguageProficiency = "ELEMENTARY" | "LIMITED_WORKING" | "PROFESSIONAL_WORKING" | "FULL_PROFESSIONAL" | "NATIVE_BILINGUAL";

    type PrismQualificationCategory = "UNDERGRADUATE" | "MASTER" | "DOCTORATE";

    type PrismRole = "DIRECTOR" | "ADMINISTRATOR" | "STAFF" | "STUDENT";

    type PrismUserRoleState = "ACCEPTED" | "REJECTED";

    type PrismPositionWorkPattern = "FULL_TIME" | "PART_TIME" | "FLEXIBLE";

    type PrismPromotionOrganizationImplementationState = "ACCEPTED" | "REJECTED" | "REDACTED" | "DETACHED";

    type PrismLocationCategory = "CITY" | "COUNTRY";

}
