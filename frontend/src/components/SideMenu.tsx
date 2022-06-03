import { FC, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '@/providers/AuthProvider';
import { clearSession } from '@/utils/storage';
import { SideAdminMenu } from '@/components/SideAdminMenu';

export const SideMenu: FC = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  const onNewDealingClick = () => {
    clearSession();
    void router.push('/dealings/new/input/');
  };

  return (
    <div className="drawer drawer-mobile bg-gray-600">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay" />
        <ul className="menu p-4 overflow-y-auto w-80   text-base-content bg-gray-300">
          {/* Sidebar content here */}
          <div className="py-3 border-b border-gray-400">
            <Link href="/mypage/">
              <h1 className="font-bold">Poppie</h1>
            </Link>
          </div>
          <li>
            <div className="m-2">
              <div className="card w-full bg-base-100 shadow-md p-3">
                <div className="card-body p-3">
                  <p className="mb-0">配布可能ポイント: {currentUser.company.point}</p>
                </div>
              </div>
            </div>
          </li>
          <li>
            <Link href="/mypage/">
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                トップページ
              </a>
            </Link>
          </li>
          <li onClick={onNewDealingClick}>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              ポイントをあげる
            </a>
          </li>
          <li>
            <Link href="/exchanges/">
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                ポイント交換
              </a>
            </Link>
          </li>

          {currentUser.isAdmin && currentUser.isActive && <SideAdminMenu />}
        </ul>
      </div>
    </div>
  );
};
