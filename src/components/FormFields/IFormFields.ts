import { MouseEvent, KeyboardEvent, ChangeEvent } from 'react';
import { THandleProgression } from '../SignUpForm/ISignUpForm';

export type FieldConfig = {
	name: string;
	id: string;
	type?: string;
	validation?: FieldValidation[];
	classNames?: string;
	label?: string;
	placeholder?: string;
	value?: string;
	onClick?: (e: MouseEvent | KeyboardEvent) => void;
	afterChange?: (args: THandleProgression) => void;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type FieldValidation = {
	rule: (value: TValueType) => boolean;
	errorMessage: string;
};

export type TValidationRules = {
	pattern: string;
	message: string;
};

export type TValueType = string | number | null | undefined | boolean;

export interface IFormFieldProps {
	submitting?: boolean;
	afterChange?: (args: THandleProgression) => void;
	name: string;
	label: string;
	validationRules?: TValidationRules;
}
