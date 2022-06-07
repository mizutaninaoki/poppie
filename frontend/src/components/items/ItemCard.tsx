import { FC } from 'react';
import { gql } from '@apollo/client';
import { ItemListFormDataType } from '@/components/items/ItemListExchangeForm';

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
      <div className="card w-96 bg-base-100 shadow-xl mb-5">
        <figure>
          <img src={item.imageUrl || '/images/no-image.png'} alt="item-image" />
        </figure>
        <div className="card-body p-6">
          <p>{item.name}</p>
          <p>
            {item.exchangeQuantity}
            {item.unit}(1{item.unit}あたり{item.exchangablePoint}
            ポイント)
          </p>
          <p>交換必要ポイント: {item.exchangeQuantity * item.exchangablePoint}ポイント</p>
        </div>
      </div>
    </>
  );
};
