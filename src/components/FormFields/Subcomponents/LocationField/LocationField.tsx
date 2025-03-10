'use client';
import { useEffect, useState, useCallback } from 'react';
import { useField } from 'react-final-form';
import { useTranslations } from 'next-intl';
import useLocales from '@/hooks/useLocales';
import { getStatesByCountry, getCitiesByCountry } from '@/services/countriesAPI';
import { IFormFieldProps, TValueType } from '../../IFormFields';
import { LOCATION_TYPES } from '@/constants';
import useCountry from '@/hooks/useCountry';
import Field from '@/components/FormFields/FormFields';
import useLocalStorage from '@/hooks/useLocalStorage';

const LocationField = ({ afterChange }: IFormFieldProps) => {
	const t = useTranslations('signUp.form');
	const { selectedCountry } = useLocales();
	const { input } = useField('location', { subscription: { value: true, error: true, touched: true } });
	const country = useCountry(selectedCountry);
	const { getStorageValue, setStorageValue } = useLocalStorage();

	const [query, setQuery] = useState(input.value || getStorageValue('location', ''));
	const [suggestionsList, setSuggestionsList] = useState<string[]>([]);
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const locationType = country?.locationType || LOCATION_TYPES.STATE;

	// Fetch available locations
	useEffect(() => {
		if (!selectedCountry) return;

		setLoading(true);
		const data =
			locationType === LOCATION_TYPES.CITY
				? getCitiesByCountry(selectedCountry)
				: getStatesByCountry(selectedCountry);

		setSuggestionsList(data || []);
		setLoading(false);
	}, [selectedCountry, locationType]);

	// Filter suggestions
	useEffect(() => {
		if (query.length < 3) {
			setSuggestions([]);
			return;
		}

		const timeout = setTimeout(() => {
			const matchingOptions = suggestionsList
				.filter((option) => option.toLowerCase().includes(query.toLowerCase()))
				.slice(0, 3);
			setSuggestions(matchingOptions);
		}, 500);

		return () => clearTimeout(timeout);
	}, [query, suggestionsList]);

	const validationRuleLocation = useCallback((value: TValueType) => {
		if (!suggestionsList.length) return true;
		return typeof value === 'string' && suggestionsList.some((item) => item.toLowerCase() === value.toLowerCase());
	}, [suggestionsList]);

	const handleSelect = useCallback((option: string) => {
		setQuery(option);
		input.onChange(option);
		setStorageValue(option, 'location');
		setSuggestions([]);

		if (typeof afterChange === 'function') {
			afterChange({ isValid: true, fieldId: 'location' });
		}
	}, [afterChange, input, setStorageValue]);

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			setQuery(value);
			input.onChange(value);
			setStorageValue(value, 'location');

			if (typeof afterChange === 'function') {
				afterChange({ isValid: validationRuleLocation(value), fieldId: input.id });
			}
		},
		[afterChange, input, setStorageValue, validationRuleLocation]
	);

	return (
		<div className="location-field">
			<Field
				id="location"
				name="location"
				type="text"
				label={t(locationType === LOCATION_TYPES.CITY ? 'label.city' : 'label.state')}
				onChange={handleChange}
				afterChange={afterChange}
				value={query}
				validation={[
					{
						rule: validationRuleLocation,
						errorMessage: t('error.invalidOption'),
					},
				]}
			/>

			{loading && <p>{t('loading')}</p>}

			{suggestions.length > 0 && query !== suggestions[0] && (
				<ul className="location-suggestions">
					{suggestions.map((option) => (
						<li key={option} onClick={() => handleSelect(option)}>
							{option}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default LocationField;
