import { useMemo } from 'react';
import countriesData from '../../public/MockedCountryData.json';
import { TCountryCode, TCountry } from './types';

export default function useCountry(countryCode: TCountryCode) {
	const country = useMemo(() =>
		countriesData.countries.find((c) => c.countryCode === countryCode) as TCountry|| null,
	[countryCode]);

	if (!country) return null;

	return {
		...country,
		countryFormFields: country.formFields,
		validationOptions: country.formFields?.find(field => field.id === 'visaType')?.validation?.options,
		fieldIds: country.formFields?.map((field) => field.id) || [],
		fieldTypes: country.formFields?.reduce((acc, field) => {
			acc[field.id] = field?.validation?.type || 'text';
			return acc;
		}, {} as Record<string, string>),
		validationRules: country.formFields?.reduce((acc, field) => {
			acc[field.id] = field.validation || {};
			return acc;
		}, {} as Record<string, unknown>),
		locationType: country.formFields?.find((field) => field.id === 'location')?.validation?.type || 'state',
	};
}
