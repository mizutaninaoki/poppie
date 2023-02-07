import { FC } from 'react';
import { gql } from '@apollo/client';
import { ItemListFormDataType } from '@/components/items/ItemListExchangeForm';

import styles from './ItemCard.module.scss';

gql`
  fragment ItemDataForItemCard on ItemType {
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

type Props = {
  item: ItemListFormDataType;
};

/**
 * 景品カード
 */
export const ItemCard: FC<Props> = ({ item }) => {
  return (
    <>
      <div className="card bg-gray-100 shadow-md pt-6">
        <div className="mx-auto w-10/12 h-full">
          <img
            src={item.imageUrl || '/images/no-image.png'}
            className="rounded-2xl w-full h-3/4"
            alt="item-image"
          />
        </div>
        <div className="card-body pt-0 font-bold">
          <p>景品名 : {item.name}</p>
          <p>
            交換数 : {item.exchangeQuantity}
            {item.unit}(1{item.unit}あたり{item.exchangablePoint}
            ポイント)
          </p>
          <p>
            交換必要ポイント : {item.exchangeQuantity * item.exchangablePoint}ポイント
          </p>
        </div>
      </div>
    </>
  );
};
