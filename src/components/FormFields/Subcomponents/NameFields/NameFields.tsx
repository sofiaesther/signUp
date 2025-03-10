import React from 'react';
import { useTranslations } from 'next-intl';
import Field from '@/components/FormFields/FormFields';
import { IFormFieldProps } from '../../IFormFields';

const NameFields = ({ name, label, afterChange } : IFormFieldProps) => {
	const t = useTranslations('signUp.form');

	return (
		<Field
			type="text"
			id="name"
			afterChange={afterChange}
			name={name}
			label={label}
			validation={[{
				rule: (value) => !!value && value.toString().length > 2,
				errorMessage: t('error.lengthError')
			}]}
		/>
	);
};

export default NameFields;
