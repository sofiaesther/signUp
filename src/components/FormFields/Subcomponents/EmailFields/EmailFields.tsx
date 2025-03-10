import React from 'react';
import { useTranslations } from 'next-intl';
import Field from '@/components/FormFields/FormFields';
import { IFormFieldProps } from '../../IFormFields';

const EmailFields = ({ afterChange } : IFormFieldProps) => {
	const t = useTranslations('signUp.form');

	return (
		<Field
			name="email"
			type="email"
			id="email"
			label={t('label.email')}
			afterChange={afterChange}
			validation={[
				{ rule: (value) => /\S+@\S+\.\S+/.test(String(value)), errorMessage: t('error.incorrectEmail') },
			]}
		/>
	);
};

export default EmailFields;
