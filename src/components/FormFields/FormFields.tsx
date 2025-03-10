'use client';
import React, { forwardRef, useCallback, useEffect } from 'react';
import { useField, Field as ReactField } from 'react-final-form';
import cn from 'classnames';
import { FieldConfig } from './IFormFields';
import useLocalStorage from '@/hooks/useLocalStorage';

const Field = forwardRef<HTMLInputElement, FieldConfig>(({
	classNames,
	label,
	validation,
	type = 'text',
	onClick,
	onChange,
	afterChange,
	id,
	name,
	placeholder,
	value
}, ref) => {
	const {
		meta: { touched, error },
		input
	} = useField(name, {
		validate: (value) => {
			if (validation) {
				for (const rule of validation) {
					if (!rule.rule(value)) {
						return rule.errorMessage;
					}
				}
			}
			return undefined;
		}
	});

	const { getStorageValue, setStorageValue, clearStorageValue } = useLocalStorage();

	// Handle Input Change
	const onChangeHandler = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
			input.onChange(newValue);

			if (typeof onChange === 'function') {
				onChange(e);
			}

			const isValid = validation ? validation.every(rule => rule.rule(newValue)) : true;

			if (typeof afterChange === 'function') {
				afterChange({ isValid, fieldId: id });
			}

			if (!isValid) {
				clearStorageValue(id);

				return;
			};

			const timer = setTimeout(() => {
				setStorageValue(String(newValue), id);
			}, 500);

			return () => clearTimeout(timer);
		},
		[input, onChange, validation, afterChange, id, clearStorageValue, setStorageValue]
	);

	// Handle Input Blur
	const onBlurHandler = useCallback(
		(e: React.FocusEvent<HTMLInputElement>) => {
			input.onBlur(e);
			const isValid = validation ? validation.every(rule => rule.rule(e.target.value)) : true;

			if (typeof afterChange === 'function') {
				afterChange({ isValid, fieldId: id });
			}
		},
		[afterChange, id, input, validation]
	);

	// Retrieve stored value on mount
	useEffect(() => {
		if (input.value) return;

		const storedValue = getStorageValue(id);
		if (storedValue) {
			input.onChange(storedValue);

			if (typeof afterChange === 'function') {
				afterChange({ isValid: true, fieldId: id });
			}
		}
	}, [id, input, getStorageValue, afterChange]);

	const isErrorShown = touched && !!error;

	return (
		<div className={cn('field', `field-${name}`, `field-${type}`)}>
			{label && id && (
				<label className="label-sibling" htmlFor={id}>
					{label}
				</label>
			)}
			<ReactField name={name}>
				{() => (
					<input
						{...input}
						id={id}
						className={cn('input-field', classNames)}
						onClick={onClick}
						onChange={onChangeHandler}
						onBlur={onBlurHandler}
						placeholder={placeholder}
						type={type}
						ref={ref}
						value={input.value || value || getStorageValue(id) || ''}
					/>
				)}
			</ReactField>

			{isErrorShown && <span className="field__error">{error}</span>}
		</div>
	);
});

Field.displayName = 'Field';

export default Field;
