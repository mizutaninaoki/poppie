import { z } from 'zod';
import { schemaForType } from '@/validations/zodHelper';
import { DealingFormDataType } from '@/components/dealings/DealingForm';

/**
 * ポイント取引フォームのバリデーション
 */

export const DealingFormDataZodSchema = schemaForType<DealingFormDataType>()(
  z.object({
    userId: z.string().nonempty({ message: "ユーザーを選択してください" }),
    name: z.string().nonempty(),
    amount: z.number().refine(
      (amount) => amount !== 0,
      'ポイント数を入力してください',
    ),
    message: z.string().optional(),
  }),
);



