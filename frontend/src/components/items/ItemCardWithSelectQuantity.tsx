import { FC } from 'react';
import { ItemListFormDataType } from '@/components/items/ItemListExchangeForm';

type Props = {
  item: ItemListFormDataType;
  onChange: (exchangeQuantity: number) => void;
};

/**
 * 交換する景品数量が選択できる景品カード
 */
export const ItemCardWithSelectQuantity: FC<Props> = ({ item, onChange }) => {
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" />
        </figure>
        <div className="card-body p-6">
          <p>{item.name}</p>
          <p>
            現在の在庫数: {item.quantity} {item.unit}
          </p>
          <p>交換ポイント: {item.exchangablePoint}ポイント</p>
        </div>
        <div>
          <input
            type="text"
            placeholder="0"
            className="input input-bordered w-full max-w-xs"
            value={item.exchangeQuantity}
            onChange={(e) => {
              const newExchangeQuantity = Number(e.target.value);
              // 数値として不正な入力が来たら何もしない
              if (Number.isNaN(newExchangeQuantity)) return;
              onChange(newExchangeQuantity);
            }}
          />
        </div>
      </div>
    </>
  );
};
