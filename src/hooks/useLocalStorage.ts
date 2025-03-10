'use client';
import { useCallback } from 'react';
import useLocales from './useLocales';

export default function useLocalStorage() {
	const { selectedCountry } = useLocales();

	const getStorageKey = useCallback((key: string) => {
		return `${selectedCountry}-${key}`;
	}, [selectedCountry]);

	const setStorageValue = useCallback((value: string, key: string) => {
		if (typeof window === 'undefined') return;
		localStorage.setItem(getStorageKey(key), JSON.stringify(value));
	}, [getStorageKey]);

	const clearStorageValue = useCallback((key: string) => {
		if (typeof window === 'undefined') return;
		localStorage.removeItem(getStorageKey(key));
	}, [getStorageKey]);

	const getStorageValue = useCallback((key: string, defaultValue: string = '') => {
		if (typeof window === 'undefined') return defaultValue;
		const item = localStorage.getItem(getStorageKey(key));
		return item ? JSON.parse(item) : defaultValue;
	}, [getStorageKey]);

	return { getStorageValue, setStorageValue, clearStorageValue };
}
