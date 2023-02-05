import { FC } from 'react';
import { gql } from '@apollo/client';
import Link from 'next/link';
import { ItemDataForItemFormFragment } from '@/generated/graphql';
import { ItemStatusName } from '@/utils/enum';

import styles from './ItemCardWithEditButton.module.scss';

type Props = {
  item: ItemDataForItemFormFragment;
};

/**
 * 編集ボタン付き景品カード
 */
export const ItemCardWithEditButton: FC<Props> = ({ item }) => {
  return (
    <>
      <div className="card w-96 shadow-md bg-gray-100 pt-6">
        <div className={styles.imageBox}>
          <img
            src={item.imageUrl || '/images/no-image.png'}
            alt="item-image"
            className="rounded-2xl w-full h-full"
          />
        </div>
        <div className="card-body p-6">
          <p>
            <span className="font-bold">景品名 : </span>
            {item.name}
          </p>
          <p>
            <span className="font-bold">現在の在庫数 :</span> {item.quantity} {item.unit}
          </p>
          <p>
            <span className="font-bold">交換ポイント :</span> {item.exchangablePoint}
            ポイント
          </p>
          <p>
            <span className="font-bold">ステータス :</span> {ItemStatusName[item.status]}
          </p>
          <div className="text-center">
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
