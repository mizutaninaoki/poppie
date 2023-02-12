import { z } from 'zod';
import { schemaForType } from '@/validations/zodHelper';
import { ItemListFormDataType } from '@/components/items/ItemListExchangeForm';
import { Statuses } from '@/generated/graphql';

/**
 * 景品一覧からポイントを交換するフォームのバリデーション
 */
export const ItemListExchangeFormDataZodSchema = schemaForType<ItemListFormDataType[]>()(
  z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        unit: z.string(),
        exchangablePoint: z.number(),
        quantity: z.number(),
        status: z.nativeEnum(Statuses),
        userId: z.string(),
        exchangeQuantity: z.number(),
      }),
    )
    // 必ず交換する景品を１つ以上選択していることを確認するバリデーション
    .refine(
      (items) => {
        const exchangeItems = items.filter((item) => item.exchangeQuantity > 0); // 未入力は除外
        return exchangeItems.length > 0;
      },
      {
        message: '交換する景品を選択してください',
      },
    )
    // 会社が持つ在庫数より交換希望数が大きい場合は交換できない
    .refine(
      (items) => {
        const exchangeItems = items.filter(
          (item) => item.exchangeQuantity > item.quantity,
        );
        return exchangeItems.length === 0;
      },
      {
        message: '交換数が在庫数を超えています',
        path: ['exchangeQuantity'],
      },
    ),
);
