import { z } from 'zod';
import { schemaForType } from '@/validations/zodHelper';
import { ProfileFormDataType } from '@/components/profiles/ProfileForm';

/**
 * プロフィールフォームのバリデーション
 */

export const ProfileFormDataZodSchema = schemaForType<ProfileFormDataType>()(
  z.object({
    name: z.string().nonempty(), // 必ず空文字は入る
    department: z.string().nonempty(), // 必ず空文字は入る
    comment: z.string().nonempty(), // 必ず空文字は入る
    imageKey: z.string().optional(),
    image: z
      .any()
      .refine(
        (val) => ['object', 'undefined'].includes(typeof val),
        '不正なファイルです',
      ), // 画像
  }),
);
