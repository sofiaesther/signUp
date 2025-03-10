import {defineRouting} from 'next-intl/routing';
import countriesData from '../../public/MockedCountryData.json';

const generatedLocales = countriesData.countries.flatMap((country) =>
	country.languageCode.map((lang) => `${lang}-${country.countryCode}`)
);

export const locales: string[] = generatedLocales;
export type Locale = `${string}-${string}`;
export const defaultLocale: Locale = 'en-us';


export const routing = defineRouting({
	locales,
	defaultLocale,
	localePrefix: 'always'
});