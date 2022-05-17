import { z } from 'zod';
import { schemaForType } from '@/validations/zodHelper';
import { DealingFormDataType } from '@/components/dealings/DealingForm';

/**
 * ポイント取引フォームのバリデーション
 */

export const DealingFormDataZodSchema = schemaForType<DealingFormDataType>()(
  z.object({
    userId: z.string().nonempty(),
    name: z.string().nonempty(),
    amount: z.number(),
    message: z.string().optional(),
  }),
);
