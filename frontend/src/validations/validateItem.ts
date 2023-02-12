import { z } from 'zod';
import { schemaForType } from '@/validations/zodHelper';
import { ItemFormDataType } from '@/components/items/ItemForm';
import { Statuses } from '@/generated/graphql';

/**
 * 景品フォームのバリデーション
 */

export const ItemFormDataZodSchema = schemaForType<ItemFormDataType>()(
  z.object({
    name: z.string().nonempty(),
    unit: z.string().nonempty(),
    exchangablePoint: z.number(),
    quantity: z.number(),
    status: z.nativeEnum(Statuses),
  }),
);
