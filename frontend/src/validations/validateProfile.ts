import { z } from 'zod';
import { schemaForType } from '@/validations/zodHelper';
import { ProfileFormDataType } from '@/components/profiles/ProfileForm';

/**
 * プロフィールフォームのバリデーション
 */

export const ProfileFormDataZodSchema = schemaForType<ProfileFormDataType>()(
  z.object({
    department: z.string().nonempty(), // 必ず空文字は入る
    comment: z.string().nonempty(), // 必ず空文字は入る
  }),
);
