import { FC, useState, useContext } from 'react';
import { gql } from '@apollo/client';
import { ItemListExchangeFormDataZodSchema } from '@/validations/validateItemListExchange';
import { useValidationErrors } from '@/hooks/useValidationErrors';
// import { AuthContext } from '@/providers/AuthProvider';
import { ItemDataForItemFormFragment } from '@/generated/graphql';
import { ItemCardWithSelectQuantity } from '@/components/items/ItemCardWithSelectQuantity';

export type ItemListFormDataType = {
  itemId: string;
  userId: string;
  quantity: number;
};

type Props = {
  items: ItemDataForItemFormFragment[];
  onSubmit: (data: ItemListFormDataType[]) => void;
};

/**
 * 景品一覧から交換する景品を選択するフォーム
 */
export const ItemListExchangeForm: FC<Props> = ({ onSubmit: onSubmitFn, items }) => {
  // const { currentUser } = useContext(AuthContext);

  const initialFormData = items.map((item) => {
    // return { itemId: item.id, userId: currentUser.id, quantity: 0 };
    return { itemId: item.id, userId: '1', quantity: 0 };
  });
  const [ListFormData, setListFormData] =
    useState<ItemListFormDataType[]>(initialFormData);

  const { errors, setErrors, resetErrors } = useValidationErrors();

  const onSubmit = () => {
    resetErrors();
    const result = ItemListExchangeFormDataZodSchema.safeParse(ListFormData);
    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    onSubmitFn(ListFormData);
  };

  const onUpdate = (idx: number, exchangeQuantity: number) => {
    const newListFormData = [...ListFormData];
    newListFormData[idx].quantity = exchangeQuantity;
  };

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {items.length > 0 ? (
        <>
          {items.map((item, idx) => (
            <ItemCardWithSelectQuantity
              item={item}
              key={item.id}
              onChange={(newExchangeQuantity) => onUpdate(idx, newExchangeQuantity)}
            />
          ))}
          <div className="w-full text-center">
            <button className="btn btn-primary" type="button" onClick={onSubmit}>
              確認する
            </button>
          </div>
        </>
      ) : (
        <p>景品が登録されていません</p>
      )}
    </div>
  );
};
