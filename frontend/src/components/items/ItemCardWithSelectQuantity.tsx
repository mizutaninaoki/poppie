import { FC } from 'react';
import { ItemListFormDataType } from '@/components/items/ItemListExchangeForm';

import styles from './ItemCardWithSelectQuantity.module.scss';

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
      <div className="card w-96 bg-gray-100 shadow-md pt-8">
        <div className={styles.imageBox}>
          <img
            src={item.imageUrl || '/images/no-image.png'}
            className="rounded-2xl w-full h-full"
            alt="item-image"
          />
        </div>
        <div className="card-body py-8 px-12 font-bold">
          <p>{item.name}</p>
          <p>
            現在の在庫数: {item.quantity} {item.unit}
          </p>
          <p>交換ポイント: {item.exchangablePoint} P</p>
        </div>
        <div className="text-center mb-8 mx-auto">
          <input
            type="text"
            placeholder="0"
            className="input w-50"
            value={item.exchangeQuantity}
            onChange={(e) => {
              const newExchangeQuantity = Number(e.target.value);
              // 数値として不正な入力が来たら何もしない
              if (Number.isNaN(newExchangeQuantity)) return;
              onChange(newExchangeQuantity);
            }}
          />
          <span className="ml-2 font-bold">{item.unit}</span>
        </div>
      </div>
    </>
  );
};
