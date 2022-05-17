import { z } from 'zod';
import { schemaForType } from '@/validations/zodHelper';
import { PurchasePointFormDataType } from '@/components/purchase-points/PurchasePointForm';

/**
 * ポイント購入フォームのバリデーション
 */

export const PurchasePointFormDataZodSchema = schemaForType<PurchasePointFormDataType>()(
  z.object({
    thouPoint: z.number(),
    tenThouPoint: z.number(),
    hundredThouPoint: z.number(),
  }),
);
