import { FC } from 'react';
import { gql } from '@apollo/client';
import Link from 'next/link';
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
  item: ItemDataForItemFormFragment;
};

/**
 * 編集ボタン付き景品カード
 */
export const ItemCardWithEditButton: FC<Props> = ({ item }) => {
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
          <p>ステータス: {ItemStatusName[item.status]}</p>
          <Link href={`/items/${item.id}/edit/`}>
            <button className="btn btn-primary">編集する</button>
          </Link>
        </div>
      </div>
    </>
  );
};
