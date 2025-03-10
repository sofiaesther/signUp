export type TValidation = {
	pattern?: string;
	type?: string;
	options?: string[];
	message?: string;
};

export type TFormField = {
	id: TFieldId;
	label: string;
	validation?: TValidation;
};

export type TCountry = {
	languageCode: TLanguageCode[];
	countryCode: TCountryCode;
	countryName: string;
	formFields: TFormField[];
};

export type TFieldId = 'idDocument' | 'location' | 'postalCode' | 'documentType' | 'visaType';

export type TCountryCode = 'us' | 'ca' | 'br' | 'ae' | 'fr' | 'in';
export type TLanguageCode = 'en' | 'pt' | 'fr';

export enum ECountryCode {
	us = 'us',
	ca = 'ca',
	br = 'br',
	ae = 'ae',
	fr = 'fr',
	in = 'in'
}

export enum ELanguageCode {
	en = 'en',
	pt = 'pt',
	fr = 'fr'
}

export type TNewUrl = {
	newCountryCode?: TCountryCode;
	newLanguageCode?: TLanguageCode;
};

export type TLangValidation = {
	countryCode: TCountryCode;
	languageCode: TLanguageCode;
};
