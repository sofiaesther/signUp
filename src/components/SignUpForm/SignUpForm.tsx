'use client';
import { useCallback, useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Form } from 'react-final-form';
import { Step1, Step2 } from './Steps';
import { ISignUpForm, TFieldIds, THandleProgression } from './ISignUpForm';
import useLocales from '@/hooks/useLocales';
import useCountry from '@/hooks/useCountry';
import { postSubscriptionForm } from '@/services/submitionAPI';
import { useRouter } from '@/i18n/navigation';
import useLocalStorage from '@/hooks/useLocalStorage';

const SignUpForm = ({ setProgression }: ISignUpForm) => {
	const [step, setStep] = useState(0);
	const { selectedCountry } = useLocales();
	const country = useCountry(selectedCountry);
	const locale = useLocale();
	const router = useRouter();
	const { clearStorageValue, getStorageValue } = useLocalStorage();

	const [fieldIds, setFieldIds] = useState<TFieldIds[]>([]);
	const [triggerProgression, setTriggerProgression] = useState(false);

	useEffect(() => {
		const fixedFields: TFieldIds[] = [
			{ id: 'name', isCorrectlyFilled: false },
			{ id: 'email', isCorrectlyFilled: false },
			{ id: 'confirmData', isCorrectlyFilled: false },
			{ id: 'privacyPolicy', isCorrectlyFilled: false }
		];

		const countrySpecificFields: TFieldIds[] =
			country?.countryFormFields?.map((field) => ({
				id: field.id,
				isCorrectlyFilled: false,
				validationRules: field.validation?.pattern && field.validation?.message
					? { pattern: field.validation.pattern, message: field.validation.message }
					: null
			})) || [];

		const allFields = [...fixedFields, ...countrySpecificFields].map(field => {
			const storedValue = getStorageValue(field.id);
			return {
				...field,
				isCorrectlyFilled: storedValue ? true : false,
			};
		});

		setFieldIds(allFields);
		setTriggerProgression((prev => !prev));
	}, [selectedCountry]);


	useEffect(() => {
		const filledFields = fieldIds.filter((field) => field.isCorrectlyFilled);

		const progress = fieldIds.length > 0 ? Math.round((filledFields.length / fieldIds.length) * 100) : 0;

		setProgression(progress);
	}, [triggerProgression]);


	const handleProgression = useCallback(
		({ fieldId, isValid }: THandleProgression) => {
			setFieldIds((prevFields) =>
				prevFields.map((field) =>
					field.id === fieldId ? { ...field, isCorrectlyFilled: isValid } : field
				)
			);

			setTriggerProgression(prev => !prev);
		},
		[setTriggerProgression, setFieldIds]
	);

	const handleOnSubmit = useCallback(async (values: Record<string, unknown>) => {
		try {
			const response = await postSubscriptionForm({
				data: { ...values, countryCode: selectedCountry },
			});

			if (response.success) {
				fieldIds.forEach((item) => clearStorageValue(item.id));

				console.log('Success! Redirecting to success page...');
				router.replace('/formSuccess', { locale });
			} else {
				console.error('Submission failed:', response?.message || 'No message provided');
				router.replace('/formFail', { locale });
			}
		} catch (error) {
			console.error('Submission error:', error);
			router.replace('/formFail', { locale });
		}
	}, [selectedCountry, fieldIds, router, locale, clearStorageValue]);

	const handleStep = useCallback(
		(values: Record<string, unknown>) => {
			const nextStep = step + 1;
			setStep(nextStep);

			if (nextStep === 2) {
				handleOnSubmit(values);
			}
		},
		[handleOnSubmit, step]
	);

	return (
		<Form
			onSubmit={handleStep}
			render={({ handleSubmit, values }) => (
				<form onSubmit={handleSubmit}>
					{step === 0 ? (
						<Step1 handleProgression={handleProgression} fieldIds={fieldIds} />
					) : (
						<Step2
							handleBackButton={() => setStep(0)}
							handleProgression={handleProgression}
							values={values}
							selectedCountry={selectedCountry}
						/>
					)}
				</form>
			)}
		/>
	);
};

export default SignUpForm;
