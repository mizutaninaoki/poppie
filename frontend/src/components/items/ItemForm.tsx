import { FC, useState } from 'react';
import { gql } from '@apollo/client';
import { ItemFormDataZodSchema } from '@/validations/validateItem';
import { useValidationErrors } from '@/hooks/useValidationErrors';
import { ItemImageForm } from '@/components/items/ItemImageForm';
import { ItemDataForItemFormFragment, ItemStatusEnum } from '@/generated/graphql';

gql`
  fragment ItemDataForItemForm on ItemType {
    id
    name
    unit
    exchangablePoint
    quantity
    status
    imageKey
    imageUrl
  }
`;

export type ItemFormDataType = {
  name: string;
  unit: string;
  exchangablePoint: number;
  quantity: number;
  status: ItemStatusEnum;
  imageKey?: string;
  image?: File;
};

type Props = {
  item?: ItemDataForItemFormFragment;
  onSubmit: (data: ItemFormDataType) => void;
  editPage?: boolean;
};

/**
 * 景品登録・編集フォーム
 */
export const ItemForm: FC<Props> = ({ onSubmit: onSubmitFn, item, editPage }) => {
  const [formData, setFormData] = useState<ItemFormDataType>({
    name: item?.name ?? '',
    unit: item?.unit ?? '',
    exchangablePoint: item?.exchangablePoint ?? 0,
    quantity: item?.quantity ?? 0,
    status: item?.status ?? ItemStatusEnum.Public,
    imageKey: item?.imageKey ?? '',
    image: undefined,
  });

  const { errors, setErrors, resetErrors } = useValidationErrors();

  const onSubmit = () => {
    resetErrors();
    const result = ItemFormDataZodSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    onSubmitFn(formData);
  };

  const onSelected = (image: File) => {
    setFormData({ ...formData, image });
  };

  return (
    <>
      <div className="col-span-12">
        <div className="shadow-md p-12 rounded-xl bg-gray-100">
          <ItemImageForm selectedImageUrl={item?.imageUrl} onSelected={onSelected} />
          <div className="w-full max-w-sm">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  景品名
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  type="text"
                  placeholder="ギフトカード"
                  className="input w-full max-w-xs"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  単位
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  type="text"
                  placeholder="選択してください"
                  className="input w-full max-w-xs"
                  value={formData.unit}
                  onChange={(e) => {
                    setFormData({ ...formData, unit: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  交換ポイント
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  type="text"
                  placeholder="100"
                  className="input w-full max-w-xs"
                  value={formData.exchangablePoint}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      exchangablePoint: Number(e.target.value),
                    });
                  }}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  在庫数
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  type="text"
                  placeholder="100"
                  className="input w-full max-w-xs"
                  value={formData.quantity}
                  onChange={(e) => {
                    setFormData({ ...formData, quantity: Number(e.target.value) });
                  }}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  公開・非公開
                </label>
              </div>
              <div className="md:w-2/3">
                <select
                  className="select w-full max-w-xs"
                  value={formData.status}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      status: e.target.value as ItemStatusEnum,
                    });
                  }}
                >
                  <option value={ItemStatusEnum.Public}>公開</option>
                  <option value={ItemStatusEnum.Private}>非公開</option>
                </select>
              </div>
            </div>
            <div className="w-full text-center">
              <button
                className="shadow bg-green-600 hover:opacity-50 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded-lg"
                type="button"
                onClick={onSubmit}
              >
                {editPage ? '更新' : '登録'}する
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
