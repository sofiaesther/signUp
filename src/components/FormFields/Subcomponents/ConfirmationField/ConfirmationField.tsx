import React from 'react';
import { useTranslations } from 'next-intl';
import Field from '@/components/FormFields/FormFields';
import { IConfirmationField } from './IConfirmationField';

const ConfirmationField = ({ name, label, afterChange }:IConfirmationField) => {
	const t = useTranslations('signUp.form');

	return (
		<Field
			name={name}
			type="checkbox"
			id={name}
			label={label}
			afterChange={afterChange}
			validation={[
				{ rule: (value) => !!value === true, errorMessage: t('error.required') },
			]}
		/>
	);
};

export default ConfirmationField;
