'use client';
import { useState, useEffect, useCallback } from 'react';
import {useLocale} from 'next-intl';
import useCountries from '@/hooks/useCountries';
import { ECountryCode, TCountryCode, TLanguageCode, TNewUrl } from './types';
import { usePathname, redirect } from '@/i18n/navigation';

export default function useLocales() {
	const { isValidCountry, isValidLanguageCountry, getCountryMainLanguage } = useCountries();

	const [lang, country] = useLocale().split('-');

	const [selectedCountry, setSelectedCountry] = useState<TCountryCode>(country as TCountryCode);
	const [selectedLanguage, setSelectedLanguage] = useState<TLanguageCode>(lang as TLanguageCode);

	const currentPath = usePathname();

	useEffect(() => {
		if (selectedCountry !== country &&  country in ECountryCode) {
			setSelectedCountry(country as TCountryCode);
		}

		if (selectedLanguage !== lang) {
			setSelectedLanguage(lang as TLanguageCode);
		}
	}, [country, lang, selectedCountry, selectedLanguage]);

	const updateURL = useCallback(
		({ newCountryCode, newLanguageCode }: TNewUrl) => {
			if (!newCountryCode && !newLanguageCode) return;

			if (newCountryCode === selectedCountry && newLanguageCode === selectedLanguage) return;

			if (newCountryCode) {
				if (!isValidCountry(newCountryCode)) return;

				let newLang = newLanguageCode || selectedLanguage;

				if (!isValidLanguageCountry({countryCode: newCountryCode, languageCode: newLang})) {
					newLang = getCountryMainLanguage(newCountryCode).value;

				}

				if (selectedLanguage !== newLang) {
					setSelectedLanguage(newLang);
				}

				setSelectedCountry(newCountryCode);
				redirect(({href: currentPath, locale: `${newLang}-${newCountryCode}`}));

				return;
			}


			if (newLanguageCode) {
				const validCountryCode = newCountryCode || selectedCountry;

				if (!isValidLanguageCountry({
					countryCode: validCountryCode,
					languageCode: newLanguageCode
				})) return;

				setSelectedLanguage(newLanguageCode);
				redirect(({href: currentPath, locale: `${newLanguageCode}-${validCountryCode}`}));
			}
		},
		[selectedCountry, selectedLanguage, isValidCountry, isValidLanguageCountry, currentPath, getCountryMainLanguage]
	);

	return {
		setSelectedCountry,
		setSelectedLanguage,
		selectedLanguage,
		selectedCountry,
		updateURL
	};
}
