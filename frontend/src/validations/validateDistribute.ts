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
  )
  .refine(
    (distributes) => {
      const distributePoints = distributes.filter((distribute) => distribute.distributePoint > 0); // 未入力は除外
      return distributePoints.length > 0;
    },
    {
      message: '配布するポイントが入力されていません',
      path: ['distributePoint'],
    },
  )
);
