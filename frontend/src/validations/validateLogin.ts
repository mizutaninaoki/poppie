import { z } from 'zod';
import { schemaForType } from '@/validations/zodHelper';
import { EMAIL_REGEXP, PASSWORD_REGEXP } from '@/utils/validateRegexp';
import { LoginFormDataType } from '@/components/LoginForm';

/**
 * ログインフォームのバリデーション
 */

export const LoginFormDataZodSchema = schemaForType<LoginFormDataType>()(
  z.object({
    email: z.string().regex(EMAIL_REGEXP),
    password: z
      .string()
      .regex(PASSWORD_REGEXP, { message: 'パスワードの形式が正しくありません' }),
  }),
);
