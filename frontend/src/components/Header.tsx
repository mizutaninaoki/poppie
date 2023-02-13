import { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useFlash } from '@/hooks/useFlash';
import { AuthContext, initialCurrentUser } from '@/providers/AuthProvider';
import { RxHamburgerMenu } from 'react-icons/rx';

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
            <div className="mr-1">
              <img src="/images/point_icon.png" alt="point_icon" className="w-6 md:w-8" />
            </div>
            <span className="text-green-600 self-center text-xl md:text-2xl font-semibold whitespace-nowrap dark:text-white">
              Poppie
            </span>
          </div>
        </Link>
        <div className="flex">
          <div className="hidden md:block">
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
                <Link href="/login/">
                  <button type="button" className={styles.headerBtnLogin}>
                    ログイン
                  </button>
                </Link>
                <Link href="/companies/new/input/">
                  <button
                    type="button"
                    data-cy="registrationInHeader"
                    className={styles.headerBtnRegistration}
                  >
                    poppieをはじめる
                  </button>
                </Link>
              </>
            )}
          </div>

          <div className="dropdown dropdown-end md:hidden">
            <label tabIndex={0}>
              <div className="cursor-pointer">
                <RxHamburgerMenu className="text-2xl"></RxHamburgerMenu>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              {currentUser.isLoggedIn ? (
                <li className="font-bold" onClick={logout}>
                  ログアウト
                </li>
              ) : (
                <>
                  <li>
                    <Link href="/login/">
                      <button type="button" className="font-bold">
                        ログイン
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/companies/new/input/">
                      <button type="button" className="font-bold">
                        poppieをはじめる
                      </button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
