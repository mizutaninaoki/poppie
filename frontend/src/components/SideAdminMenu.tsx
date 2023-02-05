import { FC } from 'react';
import Link from 'next/link';
import { RiExchangeCnyLine, RiHeartAddFill } from 'react-icons/ri';
import { HiUserGroup, HiGift } from 'react-icons/hi';

export const SideAdminMenu: FC = () => {
  return (
    <>
      <hr />

      <li className="font-bold">
        <Link href="/purchases/new/input/">
          <a>
            <RiExchangeCnyLine className="text-lg"></RiExchangeCnyLine>
            ポイント購入
          </a>
        </Link>
      </li>
      <li className="font-bold">
        <Link href="/settings/users/">
          <a>
            <HiUserGroup className="text-lg"></HiUserGroup>
            ユーザー管理
          </a>
        </Link>
      </li>
      <li className="font-bold">
        <Link href="/distributes/new/input/">
          <a>
            <RiHeartAddFill className="text-lg"></RiHeartAddFill>
            ポイント配布
          </a>
        </Link>
      </li>
      <li className="font-bold">
        <Link href="/items/">
          <a>
            <HiGift className="text-lg"></HiGift>
            景品一覧
          </a>
        </Link>
      </li>
    </>
  );
};
