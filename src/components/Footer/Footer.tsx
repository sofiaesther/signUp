'use client';
import { useTranslations } from 'next-intl';
import CountryChangeButton from '../CountryChangeButton/CountryChangeButton';
import LanguageChangeButton from '../LanguageChangeButton/LanguageChangeButton';
import '@/app/[locale]/globals.css';

const Footer = () => {
	const t = useTranslations('footer');

	return (
		<footer className="footer">
			<div className="row-group">
				<h3 className="footer-title">{t('country')}</h3>
				<CountryChangeButton />
			</div>
			<div className="row-group">
				<h3 className="footer-title">{t('language')}</h3>
				<LanguageChangeButton />
			</div>
		</footer>
	);
};

export default Footer;
