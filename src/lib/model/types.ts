export interface Model {
    name: string;
    validate?: Validation;
    properties: PropertyModel[];
}

export interface PropertyModel {
    key: string;
    title: string;
    component?: Component;
    svelteComponent?: any;
    definitions?: object;
    validate?: Validation;
}

export interface Validation {
    (value: any): ValidationResult;
}

export interface ValidationResult {
    validated: boolean;
    message?: string|string[];
}

export enum Component {
    CheckBox = 'CheckBox',
    MultiSelect = 'Multiselect',
    SingleSelect = 'SingleSelect',
    Slider = 'Slider',
    TextArea = 'TextArea',
    TextInput = 'TextInput',
}