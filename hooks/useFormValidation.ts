import { useState } from "react";

interface FormState {
  [key: string]: string;
}

export const useFormValidation = (
  initialState: FormState,
  validationRules: {
    [key: string]: (value: string) => { isValid: boolean; error: string };
  },
) => {
  const [state, setState] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormState>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const validateField = (name: string, value: string) => {
    if (validationRules[name]) {
      const validationResponse = validationRules[name](value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validationResponse.error,
      }));
      return validationResponse.isValid;
    }
    return true;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateForm = () => {
    let isValid = true;
    for (const key in state) {
      if (validationRules[key]) {
        isValid = validateField(key, state[key]) && isValid;
      }
    }
    return isValid;
  };

  return {
    state,
    errors,
    handleChange,
    handleBlur,
    validateForm,
  };
};
