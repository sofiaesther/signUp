import {TCountryCode, TFormField} from '@/hooks/types';
import { FormRenderProps } from 'react-final-form';
import { Dispatch, SetStateAction } from 'react';

export interface ISignUpForm {
	setProgression: Dispatch<SetStateAction<number>>;
}

export interface IStepsProps {
	handleProgression: (args: THandleProgression) => void;
}

export interface IStep1Prop extends IStepsProps {
	fieldIds: TFieldIds[];
}

export interface IStep2Prop extends IStepsProps {
	handleBackButton: () => void;
	values: FormRenderProps['values'];
	selectedCountry: TCountryCode;
}

export type THandleProgression = {
	fieldId: string,
	isValid: boolean
}

export interface IStep1ValidationErrors {
	birthday?: string;
}
export interface IStep2ValidationErrors {
	birthday?: string;
}

export type TSignUpFormFields = TFormField & {
    name: string;
    email: string;
}

export type TCountry = 'USA' | 'BRA' | 'CAD' | 'IND' | 'GER' | 'AUE';

export type TLocation = 'state' | 'city' | '';

export type TFieldIds = {
	id: string;
	isCorrectlyFilled: boolean;
	validationRules?: TValidationRules;
};

type TValidationRules = { message: string; pattern: string } | null;
