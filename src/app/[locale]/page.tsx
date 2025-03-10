'use client';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation'
import CountryChangeButton from '@/components/CountryChangeButton/CountryChangeButton';
import LanguageChangeButton from '@/components/LanguageChangeButton/LanguageChangeButton';
import './globals.css';

export default function HomePage() {
  	const t = useTranslations('homePage');

	return (
		<div className='page-wrapper'>
			<div className='column-group homepage'>
				<div className='column-group title-group'>
					<h1>{t('title')}</h1>
					<h3>{t.rich('subtitle')}</h3>
				</div>

				<div className='column-group content-wrapper components'>
					<div className='homepage-buttons-wrapper'>
						<div className='column-group button-wrapper'>
							<h2>{t('country')}</h2>
							<CountryChangeButton />
						</div>

						<div className='column-group button-wrapper'>
							<h2>{t('language')}</h2>
							<LanguageChangeButton />
						</div>
					</div>

					<div className='column-group'>
						<h3>{t('bottomText')}</h3>
						<Link href="/signUp" className='submit-button'>
							{t('signUpButton')}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}