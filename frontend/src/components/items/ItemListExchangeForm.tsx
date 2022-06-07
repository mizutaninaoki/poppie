import { FC, useState, useContext } from 'react';
import { ItemListExchangeFormDataZodSchema } from '@/validations/validateItemListExchange';
import { useValidationErrors } from '@/hooks/useValidationErrors';
import { AuthContext } from '@/providers/AuthProvider';
import { ItemDataForItemFormFragment, ItemStatusEnum } from '@/generated/graphql';
import { ItemCardWithSelectQuantity } from '@/components/items/ItemCardWithSelectQuantity';

export type ItemListFormDataType = ItemDataForItemFormFragment & {
  userId: string;
  exchangeQuantity: number;
};

type Props = {
  items: ItemDataForItemFormFragment[];
  onConfirm: (data: ItemListFormDataType[]) => void;
};

/**
 * 景品一覧から交換する景品を選択するフォーム
 */
export const ItemListExchangeForm: FC<Props> = ({ onConfirm: onConfirmFn, items }) => {
  const { currentUser } = useContext(AuthContext);

  const initialFormData = items.map((item) => {
    return { ...item, userId: currentUser.id, exchangeQuantity: 0 };
  });
  const [ListFormData, setListFormData] =
    useState<ItemListFormDataType[]>(initialFormData);

  const { errors, setErrors, resetErrors } = useValidationErrors();

  const onConfirm = () => {
    resetErrors();
    const result = ItemListExchangeFormDataZodSchema.safeParse(ListFormData);
    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    onConfirmFn(ListFormData);
  };

  const onUpdate = (idx: number, exchangeQuantity: number) => {
    const newListFormData = [...ListFormData];
    newListFormData[idx].exchangeQuantity = exchangeQuantity;
    setListFormData(newListFormData);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {ListFormData.length > 0 ? (
          <>
            {ListFormData.map((itemFormData, idx) => (
              <ItemCardWithSelectQuantity
                key={itemFormData.id}
                item={itemFormData}
                onChange={(newExchangeQuantity) => onUpdate(idx, newExchangeQuantity)}
              />
            ))}
          </>
        ) : (
          <p>景品が登録されていません</p>
        )}
      </div>
      <div className="w-full text-center">
        <button className="btn btn-primary" type="button" onClick={onConfirm}>
          確認する
        </button>
      </div>
    </>
  );
};
