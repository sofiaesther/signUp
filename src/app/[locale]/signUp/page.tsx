'use client';
import { useState } from 'react';
import SignUpForm from '@/components/SignUpForm/SignUpForm';
import ProgressionBar from '@/components/ProgressionBar/ProgressionBar';
import Footer from '@/components/Footer/Footer';
import '../globals.css';
import { useTranslations } from 'next-intl';

const SignUp = () => {
	const [progression, setProgression] = useState(0);
	const t = useTranslations('signUp');

	return (
		<div className="page-wrapper">
			<div className="column-group signup">
				<span className='title-group'>
					<h1>{t('title')}</h1>
				</span>
				<div className="column-group components">
					<SignUpForm setProgression={setProgression} />
					<ProgressionBar progressAmount={progression} />
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default SignUp;
