import { FC } from 'react';
import { gql } from '@apollo/client';
import Link from 'next/link';
import { ItemDataForItemFormFragment } from '@/generated/graphql';
import { ItemStatusName } from '@/utils/enum';

type Props = {
  item: ItemDataForItemFormFragment;
};

/**
 * 編集ボタン付き景品カード
 */
export const ItemCardWithEditButton: FC<Props> = ({ item }) => {
  return (
    <>
      <div className="card shadow-md bg-gray-100 pt-6">
        <div className="mx-auto w-10/12 h-full">
          <img
            src={item.imageUrl || '/images/no-image.png'}
            alt="item-image"
            className="rounded-2xl w-full h-3/4"
          />
        </div>
        <div className="card-body pt-0">
          <p className="font-bold">景品名 : {item.name}</p>
          <p className="font-bold">
            現在の在庫数 : {item.quantity} {item.unit}
          </p>
          <p className="font-bold">
            交換ポイント : {item.exchangablePoint}
            ポイント
          </p>
          <p className="font-bold">ステータス : {ItemStatusName[item.status]}</p>
          <div className="text-center mt-4">
            <Link href={`/items/${item.id}/edit/`}>
              <button className="shadow bg-green-600 hover:opacity-50 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded-lg">
                編集する
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
