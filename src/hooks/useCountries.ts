'use client';
import { useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { getCountries } from '@/services/countriesAPI'
import { TCountry, TCountryCode, TLanguageCode, TLangValidation } from './types';

export default function useCountries(): {
	isValidCountry: (countryCode: string) => boolean;
	isValidLanguageCountry: ({ countryCode, languageCode }: TLangValidation) => boolean
	countriesList: TCountry[];
	countryOptions: { label: string; value: TCountryCode }[];
	getLanguagesForCountry: (countryCode: TCountryCode) => { label: string; value: TLanguageCode }[];
	getCountryMainLanguage: (countryCode: TCountryCode) => { label: string; value: TLanguageCode };
} {
	const countriesList: TCountry[] = getCountries();
	const t = useTranslations();

	const countryOptions = useMemo(() => countriesList?.map((country) => ({
		label: t(`countries.label.${country.countryCode}`),
		value: country.countryCode as TCountryCode,
	})), [countriesList, t]);

	const isValidCountry = useCallback((countryCode: string) => {
		return countryOptions.some((country) => country.value === countryCode);
	},[countryOptions]);

	const getLanguagesForCountry = useCallback((countryCode: TCountryCode) => {
		const country = countriesList.find((c) => c.countryCode === countryCode);
		if (!country || !country.languageCode) return [];

		return country?.languageCode?.map((lang) => ({
			label: t(`languages.label.${lang}`),
			value: lang as TLanguageCode,
		}));
	},[countriesList, t]);

	const getCountryMainLanguage = useCallback((countryCode: TCountryCode) => {
		const languages = getLanguagesForCountry(countryCode);
		return languages[0] || { label:  t(`languages.label.en`), value: 'en' as TLanguageCode };
	},[getLanguagesForCountry, t]);


	const isValidLanguageCountry = useCallback(({countryCode, languageCode} :TLangValidation) => {
		if (!isValidCountry(countryCode)) return false;

		return getLanguagesForCountry(countryCode as TCountryCode).some((lang) => lang.value === languageCode);
	},[getLanguagesForCountry, isValidCountry]);

	return { isValidLanguageCountry, isValidCountry, countriesList, countryOptions, getLanguagesForCountry, getCountryMainLanguage };
}
