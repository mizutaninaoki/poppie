import { FC, useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/providers/AuthProvider';
import { RiExchangeCnyLine, RiHeartAddFill } from 'react-icons/ri';
import { HiUserGroup, HiGift } from 'react-icons/hi';

export const SideAdminMenu: FC = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <hr />
      <li className="font-bold text-center">
        <h4 className="text-center mx-auto">管理者メニュー</h4>
      </li>
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

      <li>
        <div className="m-2 active:text-gray-600 hover:bg-green-50 hover:cursor-auto">
          <div className="bg-white p-6 rounded-xl w-full text-center">
            <p className="font-bold">管理者ポイント : {currentUser.company.point} P</p>
          </div>
        </div>
      </li>
    </>
  );
};
