import { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useFlash } from '@/hooks/useFlash';
import { AuthContext, initialCurrentUser } from '@/providers/AuthProvider';

import styles from './Header.module.scss';

export const Header: FC = () => {
  const router = useRouter();
  const { setFlash } = useFlash();
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const logout = async () => {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    setCurrentUser({ ...initialCurrentUser, isLoaded: true });
    await router.push('/');
    setFlash('ログアウトしました');
  };

  return (
    <nav className="w-full border-gray-200 px-2 sm:px-4 py-4 border-b bg-green-50">
      <div className="flex flex-wrap justify-between items-center mx-auto">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <div className="mr-2">
              <img
                src="/images/point_icon.png"
                width="32px"
                alt="point_icon"
                className=""
              />
            </div>
            <span className="text-green-600 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Poppie
            </span>
          </div>
        </Link>
        <div className="flex flex-row-reverse md:order-2">
          <div
            className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-4"
          ></div>

          {currentUser.isLoggedIn ? (
            <button
              type="button"
              className="text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={logout}
            >
              ログアウト
            </button>
          ) : (
            <>
              <Link href="/companies/new/input/">
                <button type="button" className={styles.headerBtnRegistration}>
                  poppieをはじめる
                </button>
              </Link>
              <Link href="/login/">
                <button type="button" className={styles.headerBtnLogin}>
                  ログイン
                </button>
              </Link>
            </>
          )}

          {/* mobile */}
          <button
            data-collapse-toggle="mobile-menu-4"
            type="button"
            className="inline-flex items-center p-2 text-sm rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-4"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};
