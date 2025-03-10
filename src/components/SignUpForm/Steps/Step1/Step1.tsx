import React from 'react';
import { useTranslations } from 'next-intl';

import { IStep1Prop } from '../../ISignUpForm';
import {
	EmailFields,
	NameFields,
	LocationField,
	PostalCodeField,
	IdentificationField,
	VisaTypeField
} from '@/components/FormFields/Subcomponents';

const Step1 = ({ handleProgression, fieldIds }: IStep1Prop) => {
	const t = useTranslations('signUp');

	return (
		<div className="step1-wrapper">
			<div className='column-group title-group'>
				<h2>{t('step1.title')}</h2>
				<h3>{t('step1.description')}</h3>
			</div>

			<div className="fields">
				<EmailFields afterChange={handleProgression} name={'email'} label={t('form.label.email')} />
				<NameFields afterChange={handleProgression} name={'name'} label={t('form.label.name')} />

				{fieldIds.some(field => field.id === 'location') && (
					<LocationField afterChange={handleProgression} name={'location'} label={t('form.label.location')} />
				)}

				{fieldIds.some(field => field.id === 'postalCode') && (
					<PostalCodeField
						afterChange={handleProgression}
						name={'postalCode'}
						label={t('form.label.postalCode')}
						validationRules={fieldIds.find(field => field.id === 'postalCode')?.validationRules || undefined}
					/>
				)}

				{fieldIds.some(field => field.id === 'idDocument') && (
					<IdentificationField
						afterChange={handleProgression}
						name={'idDocument'}
						label={t('form.label.idDocument')}
						validationRules={fieldIds.find(field => field.id === 'idDocument')?.validationRules || undefined}
					/>
				)}

				{fieldIds.some(field => field.id === 'visaType') && (
					<VisaTypeField
						afterChange={handleProgression}
						name={'visaType'}
						label={t('form.label.visaType')}
					/>
				)}

			</div>

			<button className="submit-button" type="submit">
				{t('confirmButton')}
			</button>
		</div>
	);
};

export default Step1;
