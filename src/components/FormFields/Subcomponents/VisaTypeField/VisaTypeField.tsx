'use client';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useField } from 'react-final-form';
import { useTranslations } from 'next-intl';
import useLocales from '@/hooks/useLocales';
import useCountry from '@/hooks/useCountry';
import { IFormFieldProps } from '../../IFormFields';
import useLocalStorage from '@/hooks/useLocalStorage';

const VisaTypeField = ({ afterChange, name, label }: IFormFieldProps) => {
	const t = useTranslations('signUp.form');
	const { selectedCountry } = useLocales();
	const { input } = useField('visaType', { subscription: { value: true, error: true, touched: true } });
	const country = useCountry(selectedCountry);

	const { getStorageValue, setStorageValue } = useLocalStorage();
	const [selectedVisa, setSelectedVisa] = useState(() => getStorageValue('visaType', input.value || ''));

	const visaOptions = useMemo(() => {
		return country?.validationOptions || [];
	}, [country]);

	useEffect(() => {
		const storedVisa = getStorageValue('visaType');

		if (storedVisa && !input.value) {
			setSelectedVisa(storedVisa);
			input.onChange(storedVisa);

			if (typeof afterChange === 'function') {
				afterChange({ isValid: visaOptions.includes(storedVisa), fieldId: 'visaType' });
			}
		}
	}, []);

	const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setSelectedVisa(value);
		input.onChange(value);
		setStorageValue(value, 'visaType');

		if (typeof afterChange === 'function') {
			afterChange({ isValid: visaOptions.includes(value), fieldId: 'visaType' });
		}
	}, [afterChange, input, setStorageValue, visaOptions]);

	return (
		<div className="field visa-type-field">
			<label htmlFor={name} className="label-sibling">{label}</label>
			<select
				id="visaType"
				name="visaType"
				value={selectedVisa}
				onChange={handleChange}
				className="visa-type-select input-field"
			>
				<option value="" disabled>{label}</option>
				{visaOptions.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>

			{input.touched && input.error && <span className="field__error">{t('error.visaType')}</span>}
		</div>
	);
};

export default VisaTypeField;
