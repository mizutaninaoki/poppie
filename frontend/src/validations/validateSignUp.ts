import { z } from 'zod';
import { schemaForType } from '@/validations/zodHelper';
import { EMAIL_REGEXP, PASSWORD_REGEXP } from '@/utils/validateRegexp';
import { SignUpFormDataType } from '@/components/SignUpForm';

/**
 * 新規登録フォームのバリデーション
 */

export const SignUpFormDataZodSchema = schemaForType<SignUpFormDataType>()(
  z.object({
    name: z.string().nonempty(),
    email: z.string().regex(EMAIL_REGEXP),
    password1: z.string().regex(PASSWORD_REGEXP, {
      message: 'パスワードの形式が正しくありません',
    }),
  }),
);
