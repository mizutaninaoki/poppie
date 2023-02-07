import { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useFlash } from '@/hooks/useFlash';
import { AuthContext, initialCurrentUser } from '@/providers/AuthProvider';
import { RxHamburgerMenu } from 'react-icons/rx';

type Props = {
  setResClass: (data: string) => void;
};

export const MyPageHeader: FC<Props> = ({ setResClass }) => {
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
    <div className="navbar bg-base-100 border-b border-gray-200">
      <div className="flex-1">
        <label
          htmlFor="my-drawer-2"
          className="cursor-pointer lg:hidden"
          onClick={() => {
            setResClass('');
          }}
        >
          <RxHamburgerMenu></RxHamburgerMenu>
        </label>
      </div>
      <div className="flex-none gap-2">
        <div className="font-bold text-xs">
          {currentUser.company.name} : {currentUser.name}
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src={currentUser.profile?.imageUrl || '/images/blank-profile-picture.png'}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 font-bold"
          >
            <li>
              <Link href="/mypage/">
                <a>マイページ</a>
              </Link>
            </li>
            <li>
              <Link href="/profile/input/">
                <a>プロフィール</a>
              </Link>
            </li>
            <li onClick={logout}>
              <a>ログアウト</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
