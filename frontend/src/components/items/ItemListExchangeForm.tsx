import { FC, useState, useContext, useMemo } from 'react';
import { ItemListExchangeFormDataZodSchema } from '@/validations/validateItemListExchange';
import { useValidationErrors } from '@/hooks/useValidationErrors';
import { AuthContext } from '@/providers/AuthProvider';
import { ItemDataForItemFormFragment } from '@/generated/graphql';
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

  // 現在の交換必要ポイント
  const selectedItemTotalPoint = useMemo(() => {
    return ListFormData.reduce(
      (prev, current) => prev + current.exchangablePoint * current.exchangeQuantity,
      0,
    );
  }, [ListFormData]);

  return (
    <>
      <div className="w-full text-right">
        <div className="card bg-base-100 shadow-xl mb-5 inline-block">
          <div className="card-body p-6 text-left">
            <p>交換可能ポイント: {currentUser.account?.givablePoint} P</p>
            <p>
              現在の交換必要ポイント:
              {selectedItemTotalPoint}P
            </p>
          </div>
        </div>
      </div>
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
