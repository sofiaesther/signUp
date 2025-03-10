import React from 'react';
import { useTranslations } from 'next-intl';
import Field from '@/components/FormFields/FormFields';
import { IFormFieldProps } from '../../IFormFields';

const PostalCodeField = ({ name, label, afterChange, validationRules } : IFormFieldProps) => {
	const t = useTranslations('signUp.form');

	const regexPattern = validationRules?.pattern ? new RegExp(validationRules.pattern) : null;
	const errorMessage = t('error.validPostalCode') + String(validationRules?.message);

	return (
		<Field
			name={name}
			label={label}
			id="postalCode"
			type="text"
			afterChange={afterChange}
			placeholder={String(validationRules?.message)}
			validation={[
				{
					rule: (value) => (regexPattern ? regexPattern.test(String(value)) : true),
					errorMessage,
				},
			]}
		/>
	);
};

export default PostalCodeField;
