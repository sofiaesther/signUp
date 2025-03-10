import { FieldValidation } from "./IFormFields";

export const composeValidators = (validators: FieldValidation[]) => (value: string) => {
    for (const validator of validators) {
        if (!validator.rule(value)) {
            return validator.errorMessage;
        }
    }
    return null;
};