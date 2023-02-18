import { FC, ReactElement, useContext } from 'react';

import { NextPageWithLayout } from '@/pages/_app';
import { NormalLayout } from '@/components/layout/NormalLayout';
import { AuthContext } from '@/providers/AuthProvider';
import { LayoutWithSideBar } from '@/components/layout/LayoutWithSideBar';

/**
 * 404ページ
 */
const Poppie404Page: NextPageWithLayout = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="container mx-auto">
      <div className="h-screen flex justify-center items-center">
        <div className="bg-gray-100 px-12 py-10 rounded-xl text-center">
          <h2>ページが見つかりませんでした</h2>
          <p className="mb-5">
            URLが間違っているか、ページが削除された可能性があります。
          </p>
          {currentUser.isLoggedIn ? (
            <a
              className="shadow bg-green-600 hover:opacity-50 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded-lg"
              href="/mypage"
            >
              マイページへ
            </a>
          ) : (
            <a
              className="shadow bg-green-600 hover:opacity-50 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded-lg"
              href="/"
            >
              トップページへ
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Poppie404Page;

Poppie404Page.getLayout = function getLayout(page: ReactElement) {
  return <NormalLayout>{page}</NormalLayout>;
};
