import { z } from 'zod';
import { schemaForType } from '@/validations/zodHelper';
import { CompanyFormDataType } from '@/components/companies/CompanyForm';

/**
 * 会社情報フォームのバリデーション
 */

export const CompanyFormDataZodSchema = schemaForType<CompanyFormDataType>()(
  z.object({
    planId: z.string().nonempty(),
    name: z.string().nonempty(),
    email: z.string().nonempty(),
    tel: z.string().nonempty(),
  }),
);
