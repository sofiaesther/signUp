'use client';
import Select, { SingleValue } from 'react-select';
import useLocales from '@/hooks/useLocales';
import useCountries from '@/hooks/useCountries';
import { TCountryCode } from '@/hooks/types';
import { useCallback, useEffect, useState } from 'react';
//import './CountrySelectorStyle.css';

const CountryChangeButton = () => {
	const { selectedCountry, updateURL } = useLocales();
	const { countryOptions } = useCountries();
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const handleCountrySelection = useCallback((selectedOption: SingleValue<{ label: string; value: TCountryCode }>) => {
		if (!selectedOption) return;

		updateURL({newCountryCode: selectedOption.value});
	},[updateURL]);

	if (!isClient) return;

	return (
		<div className="change-button">
			<div className="row-group show-mobile">
				<h4>{selectedCountry}</h4>
				<Select
					options={countryOptions}
					onChange={handleCountrySelection}
					value={countryOptions.find((c) => c.value === selectedCountry)}
					classNamePrefix="select-mobile-country"
					menuPlacement="bottom"
				/>
			</div>
			<div className="show-desktop">
				<Select
					options={countryOptions}
					onChange={handleCountrySelection}
					value={countryOptions.find((c) => c.value === selectedCountry)}
					classNamePrefix="select-desktop"
					menuPlacement="top"
				/>
			</div>
		</div>
	);
};

export default CountryChangeButton;
