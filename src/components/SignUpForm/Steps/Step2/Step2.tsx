import React from 'react';
import { useTranslations } from 'next-intl';
import { ConfirmationField } from '@/components/FormFields/Subcomponents';

import { IStep2Prop } from '../../ISignUpForm';

const Step2 = ({ handleBackButton, values, selectedCountry, handleProgression }: IStep2Prop) => {
	const t = useTranslations('signUp.form');
	const tCountry = useTranslations('countries.label');

	return (
		<div className="step2-wrapper">
			<h2 className="step2-title">Confirm Your Data</h2>

			<div className="filled-fields">
				<div className='row-group'>
					<h4>{t('label.name')}:</h4>
					<p>{values.name}</p>
				</div>
				<div className='row-group'>
					<h4>{t('label.email')}:</h4>
					<p>{values.email}</p>
				</div>
				<div className='row-group'>
					<h4>{t('label.country')}:</h4>
					<p>{tCountry(selectedCountry)}</p>
				</div>
				<div className='row-group'>
					<h4>{t('label.location')}:</h4>
					<p>{values.location}</p>
				</div>
				<div className='row-group'>
					<h4>{t('label.postalCode')}:</h4>
					<p>{values.postalCode}</p>
				</div>
			</div>

			<div className="fields">
				<ConfirmationField
					name="confirmData"
					label={t('label.confirmData')}
					afterChange={handleProgression}
				/>
				<ConfirmationField
					name="privacyPolicy"
					label={t('label.privacyPolicy')}
					afterChange={handleProgression}
				/>
			</div>

			<div className="row-group">
				<button className="submit-button" type="submit">
					Submit
				</button>
				<button className="return-button" onClick={handleBackButton}>
					Return
				</button>
			</div>
		</div>
	);
};

export default Step2;
