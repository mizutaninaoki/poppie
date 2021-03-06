import { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useFlash } from '@/hooks/useFlash';
import { AuthContext, initialCurrentUser } from '@/providers/AuthProvider';

export const MyPageHeader: FC = () => {
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
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <div className="flex-none gap-2">
        <div>
          {currentUser.company.name}: {currentUser.name}
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://api.lorem.space/image/face?hash=33791" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
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
