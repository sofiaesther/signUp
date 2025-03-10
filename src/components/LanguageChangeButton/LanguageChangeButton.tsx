'use client';
import { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import useCountries from '@/hooks/useCountries';
import useLocales from '@/hooks/useLocales';
import { TLanguageCode } from '@/hooks/types';

const LanguageChangeButton = () => {
	const { getLanguagesForCountry } = useCountries();
	const { selectedCountry, updateURL, selectedLanguage } = useLocales();
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
	setIsClient(true);
	}, []);

	const [validLanguages, setValidLanguages] = useState<{ label: string; value: TLanguageCode }[]>(getLanguagesForCountry(selectedCountry));

	useEffect(() => {
		if (!selectedCountry) return;

		const languagesList = getLanguagesForCountry(selectedCountry);

		setValidLanguages(languagesList);

	}, [getLanguagesForCountry, selectedCountry]);

	const handleLanguageSelection = (selectedOption: SingleValue<{ label: string; value: TLanguageCode }>) => {
		if (!selectedOption) return;

		updateURL({newLanguageCode: selectedOption.value});
	};

	if (!isClient) return;

	return (
		<div className="change-button">
			<div className="row-group show-mobile">
				<h4>{selectedLanguage}</h4>
				<Select
					options={validLanguages}
					onChange={handleLanguageSelection}
					classNamePrefix="select-mobile-language"
					placeholder={validLanguages.find((lang) => lang.value === selectedLanguage)?.label || 'Select a language'}
					value={validLanguages.find((lang) => lang.value === selectedLanguage) || null}
					menuPlacement="bottom"
				/>
			</div>
			<div className="show-desktop">
				<Select
					options={validLanguages}
					onChange={handleLanguageSelection}
					classNamePrefix="select-desktop"
					placeholder={validLanguages.find((lang) => lang.value === selectedLanguage)?.label || 'Select a language'}
					value={validLanguages.find((lang) => lang.value === selectedLanguage) || null}
					menuPlacement="top"
				/>
			</div>
		</div>
	);
};

export default LanguageChangeButton;
