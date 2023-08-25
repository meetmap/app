import { useState } from "react";

interface ValidationRules<T> {
  [key: string]: (value: T[keyof T]) => boolean;
}

interface ValidationErrors {
  [key: string]: string | null;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
}

export function useFormValidator<T>(initialValues: T, validationRules: ValidationRules<T>) {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = (): ValidationResult => {
    const newErrors: ValidationErrors = {};

    for (const fieldKey in initialValues) {
      if (initialValues.hasOwnProperty(fieldKey)) {
        const value = initialValues[fieldKey as keyof T];
        const validator = validationRules[fieldKey];
        
        if (validator) {
          newErrors[fieldKey] = validator(value) ? null : "Invalid value";
        } else {
          newErrors[fieldKey] = null; // No validator, no error
        }
      }
    }

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => error === null);

    return {
      isValid,
      errors: newErrors,
    };
  };

  return {
    errors,
    validateForm,
  };
}
