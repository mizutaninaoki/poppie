import { z } from 'zod';
import { schemaForType } from '@/validations/zodHelper';
import { DistributePointFormDataType } from '@/components/distribute-points/DistributePointForm';

/**
 * ポイント配布フォームのバリデーション
 */

export const DistributePointFormDataZodSchema =
  schemaForType<DistributePointFormDataType>()(
    z.array(
      z.object({
        accountId: z.string().nonempty(),
      }),
    ),
  );
