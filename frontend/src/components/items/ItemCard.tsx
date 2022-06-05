import { FC } from 'react';
import { gql } from '@apollo/client';
import Link from 'next/link';
import { ItemListFormDataType } from '@/components/items/ItemListExchangeForm';
import { ItemDataForItemFormFragment } from '@/generated/graphql';
import { ItemStatusName } from '@/utils/enum';

gql`
  fragment ItemDataForItemCard on ItemType {
    id
    name
    unit
    exchangablePoint
    quantity
    status
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
          <img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" />
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
