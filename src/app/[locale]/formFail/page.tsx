'use client';
import '../globals.css';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Footer from '@/components/Footer/Footer';

const FailPage = () => {
	const t = useTranslations('signUp.fail');

	return (
		<div className="page-wrapper fail-page">
			<div className='title-group'>
				<h1>{t('title')}</h1>
			</div>
			<div className='column-group'>
				<h3>{t('subtitle')}</h3>
				<Link href="/signUp" className='submit-button'>
					{t('button')}
				</Link>
			</div>

			<Footer />
		</div>
	);
};

export default FailPage;
