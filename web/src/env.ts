export const configuration: IEnvironment = {
    DEV: {
        distribution: 'Development',
        oauth: {
            facebook: '354986761351368',
            linkedin: '772yxzl30r2opy'
        },
        cloudinaryFolder: 'local'
    },
    PROD: {
        distribution: null,
        oauth: {
            facebook: '172294119620634',
            linkedin: '77ov3j18pe3njn'
        },
        cloudinaryFolder: 'p'
    }
};

export interface IEnvironment {
    [index: string]: IEnvironmentConfiguration;
}

export interface IEnvironmentConfiguration {
    distribution: string;
    oauth: IEnvironmentOauth;
    cloudinaryFolder: string;
}

export interface IEnvironmentOauth {
    facebook: string;
    linkedin: string;
}
