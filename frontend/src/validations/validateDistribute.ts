import { z } from 'zod';
import { schemaForType } from '@/validations/zodHelper';
import { DistributeFormDataType } from '@/components/distributes/DistributeForm';

/**
 * ポイント配布フォームのバリデーション
 */

export const DistributeFormDataZodSchema = schemaForType<DistributeFormDataType>()(
  z.array(
    z.object({
      accountId: z.string().nonempty(),
      distributePoint: z.number(),
    }),
  ),
);
