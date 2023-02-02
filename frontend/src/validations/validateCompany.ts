import { z } from 'zod';
import { schemaForType } from '@/validations/zodHelper';
import parsePhoneNumber from 'libphonenumber-js';
import { EMAIL_REGEXP, PASSWORD_REGEXP } from '@/utils/validateRegexp';
import { CompanyFormDataType } from '@/components/companies/CompanyForm';

/**
 * 会社情報フォームのバリデーション
 */

export const CompanyFormDataZodSchema = schemaForType<CompanyFormDataType>()(
  z.object({
    planId: z.string().nonempty({ message: "プランを選択してください" }),
    name: z.string().nonempty(),
    email: z.string().regex(EMAIL_REGEXP),
    tel: z.string().refine(
      (tel) => {
        const phoneNumber = parsePhoneNumber(tel, 'JP');
        return phoneNumber?.isValid();
      },
      (tel) => {
        return !tel
          ? { message: '入力してください' }
          : { message: '電話番号の形式が正しくありません' };
      },
    ),
  }),
);
