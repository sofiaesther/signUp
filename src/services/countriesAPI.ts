import countriesData from '../../public/MockedCountryData.json';
import statesData from '../../public/MockedCountriesStates.json';
import citiesData from '../../public/MockedCountriesCities.json';

import { TCountry } from '@/hooks/types';

export const getCountries = (): TCountry[] => {
	if (!countriesData.countries) {
		console.log('FETCH COUNTRIES ERROR');
		return [];
	}

	return countriesData.countries as TCountry[];
};

export const getStatesByCountry = (countryCode: string): string[] => {
	return statesData[countryCode] || [];
};

export const getCitiesByCountry = (countryCode: string): string[] => {
	return citiesData[countryCode] || [];
};
