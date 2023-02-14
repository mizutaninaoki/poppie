import { useCallback, useState } from 'react';
import { usePageError } from '@/hooks/usePageError';
import { z } from 'zod';
import _groupby from 'lodash.groupby';


type ValidationErrorType = {
  [k: string]: { message: string };
};

interface Returning<T> {
  errors: ValidationErrorType | undefined;
  setErrors: (error: z.ZodFormattedError<T>) => void;
  resetErrors: () => void;
}


export function useValidationErrors<T = any>(): Returning<T> {
  const [validationErrors, setValidationErrors] = useState<
    ValidationErrorType | undefined
  >(undefined);
  const { pageError, setPageError, resetPageError } = usePageError();

  const setErrors = useCallback((errors: z.ZodFormattedError<T>) => {
    const errs: { [key: string]: { message: any } } = {};

    // zodのエラーを email: { message: '入力してください' }　みたいな形に変更する
    Object.keys(errors).forEach((key) => {
      if (key === '_errors') return;
      {/* @ts-ignore */}
      errs[key] = { message: errors[key]._errors.join('。') };
    });

    setPageError(new Error('入力した値に不備があります'));
    setValidationErrors(errs);
  }, []);

  const resetErrors = useCallback(() => {
    resetPageError();
    setValidationErrors(undefined);
  }, []);

  return {
    errors: validationErrors,
    setErrors,
    resetErrors,
  };
}
