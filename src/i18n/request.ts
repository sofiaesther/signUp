import { AbstractIntlMessages } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import deepmerge from 'deepmerge';
import { locales, defaultLocale } from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  	let locale = await requestLocale;

	if (!locale || !locales.includes(locale)) {
		locale = defaultLocale;
	}

	const [lang, country] = locale.split('-');

	const generalMessages = await import(`../translations/default/${lang}.json`).then((m) => m.default);

	let countryMessages = {};

	try {
		countryMessages = await import(`../translations/country/${lang}-${country}.json`).then((m) => m.default);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		console.warn(`⚠️ No specific translations for ${locale}, using only ${lang}.json`);
	}

	const mergedMessages: AbstractIntlMessages = deepmerge(generalMessages, countryMessages);

	return {
		locale,
		messages: mergedMessages,
	};
});
