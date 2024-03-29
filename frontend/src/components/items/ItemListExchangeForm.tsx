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
    if (!currentUser.account) return;
    if (selectedItemTotalPoint >= currentUser.account?.receivedPoint) {
      alert('交換可能ポイントが足りません');
      return;
    }

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
        <div className="bg-green-50 shadow-lg rounded-lg mb-5 inline-block">
          <div className="p-6 text-left">
            <p className="font-bold mb-1 text-sm md:text-md">
              交換可能なポイント : {currentUser.account?.receivedPoint} P
            </p>
            <p className="font-bold text-sm md:text-md">
              現在の交換必要ポイント : {selectedItemTotalPoint} P
            </p>
          </div>
        </div>
      </div>

      {ListFormData.length > 0 ? (
        <>
          <div className="grid grid-cols-1 text-left mb-2 md:mb-4">
            <h3 className="font-bold text-md md:text-lg">
              交換する景品数を入力してください
            </h3>
          </div>
          <div className="grid mb-8 grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 md:gap-8 xl:grid-cols-4 xl:gap-12">
            {ListFormData.map((itemFormData, idx) => (
              <ItemCardWithSelectQuantity
                key={itemFormData.id}
                item={itemFormData}
                onChange={(newExchangeQuantity) => onUpdate(idx, newExchangeQuantity)}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="font-bold">景品が登録されていません</p>
      )}

      <div className="w-full text-center">
        {ListFormData.length > 0 && (
          <button
            className="shadow bg-green-600 hover:opacity-50 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded-lg"
            type="button"
            onClick={onConfirm}
          >
            確認する
          </button>
        )}
      </div>
    </>
  );
};
