import React from 'react';
import { useTranslations } from 'next-intl';
import Field from '@/components/FormFields/FormFields';
import { IFormFieldProps } from '../../IFormFields';

const IdentificationField = ({ name, label, afterChange, validationRules }: IFormFieldProps) => {
	const t = useTranslations('signUp.form');

	const regexPattern = validationRules?.pattern ? new RegExp(validationRules.pattern) : null;
	const errorMessage = t('error.idDocument') + String(validationRules?.message);

	return (
		<Field
			name={name}
			type="text"
			id="idDocument"
			placeholder={String(validationRules?.message)}
			label={label}
			afterChange={afterChange}
			validation={[
				{
					rule: (value) => (regexPattern ? regexPattern.test(String(value)) : true),
					errorMessage,
				},
			]}
		/>
	);
};

export default IdentificationField;
