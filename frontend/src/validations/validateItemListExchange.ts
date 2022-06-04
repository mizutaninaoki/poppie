import { z } from 'zod';
import { schemaForType } from '@/validations/zodHelper';
import { ItemListFormDataType } from '@/components/items/ItemListExchangeForm';

/**
 * 景品一覧からポイントを交換するフォームのバリデーション
 */
export const ItemListExchangeFormDataZodSchema = schemaForType<ItemListFormDataType[]>()(
  z
    .array(
      z.object({
        itemId: z.string(),
        userId: z.string(),
        quantity: z.number(),
      }),
    )
    // 必ず交換する景品を１つ以上選択していることを確認するバリデーション
    .refine(
      (items) => {
        const exchangeItems = items.filter((item) => item.quantity > 0); // 未入力は除外
        return exchangeItems.length > 0;
      },
      {
        message: '交換する景品を選択してください',
      },
    ),
);
