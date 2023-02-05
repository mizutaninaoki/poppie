import { FC, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '@/providers/AuthProvider';
import { clearSession } from '@/utils/storage';
import { SideAdminMenu } from '@/components/SideAdminMenu';
import { FaHome, FaHandHoldingHeart, FaExchangeAlt } from 'react-icons/fa';
import { RiFolderSharedFill, RiFolderReceivedFill } from 'react-icons/ri';

export const SideMenu: FC = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  const onNewDealingClick = () => {
    clearSession();
    void router.push('/dealings/new/input/');
  };

  return (
    <div className="drawer drawer-mobile bg-green-50 h-screen">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay" />
        <ul className="menu p-4 overflow-y-auto w-80   text-base-content bg-green-50 h-screen">
          <li>
            {/* Sidebar content here */}
            <div className="py-3 text-center active:bg-green-50 hover:bg-green-50">
              <Link href="/mypage/">
                <div>
                  <img
                    src="/images/point_icon.png"
                    width="24px"
                    alt="point_icon"
                    className="inline mb-2"
                  />
                  <h1 className="font-bold text-lg inline ml-1">Poppie</h1>
                </div>
              </Link>
            </div>
          </li>
          <li>
            <div className="m-2 active:text-gray-600 hover:bg-green-50 hover:cursor-auto">
              <div className="bg-white p-6 rounded-xl w-full text-center">
                <p className="font-bold">
                  授与可能ポイント : {currentUser.account?.givablePoint} P
                </p>
              </div>
            </div>
          </li>
          <li className="font-bold">
            <Link href="/mypage/">
              <a>
                <FaHome className="text-lg"></FaHome>
                トップページ
              </a>
            </Link>
          </li>
          <li className="font-bold" onClick={onNewDealingClick}>
            <a>
              <FaHandHoldingHeart className="text-lg"></FaHandHoldingHeart>
              ポイントをあげる
            </a>
          </li>
          <li className="font-bold">
            <Link href="/dealings/gave">
              <a>
                <RiFolderSharedFill className="text-lg"></RiFolderSharedFill>
                あげたポイント一覧
              </a>
            </Link>
          </li>
          <li className="font-bold">
            <Link href="/dealings/received">
              <a>
                <RiFolderReceivedFill className="text-lg"></RiFolderReceivedFill>
                もらったポイント一覧
              </a>
            </Link>
          </li>
          <li className="font-bold">
            <Link href="/exchanges/">
              <a>
                <FaExchangeAlt className="text-lg"></FaExchangeAlt>
                景品交換
              </a>
            </Link>
          </li>

          {currentUser.isAdmin && currentUser.isActive && <SideAdminMenu />}
        </ul>
      </div>
    </div>
  );
};
