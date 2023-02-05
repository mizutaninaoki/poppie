import { FC } from 'react';
import Link from 'next/link';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import { useFlash } from '@/hooks/useFlash';
import { usePageFatalError } from '@/hooks/usePageFatalError';

import userLoginRequired from '@/hoc/userLoginRequired';

/**
 * 景品交換完了画面
 */
const ExchangesCompletePage: FC = () => {
  const { setFlash } = useFlash();
  const { setPageFatalError } = usePageFatalError();

  return (
    <PageContainerWithError>
      <div className="h-screen flex justify-center items-center">
        <div className="bg-gray-100 py-10 px-8 rounded-xl text-center">
          <h1 className="text-2xl mb-5 font-bold">景品交換依頼完了</h1>
          <div className="w-full text-center">
            <div>
              <h4 className="mb-0">景品の交換依頼が完了しました。</h4>
              <p className="mb-8">後日担当者より依頼した景品が渡されます。</p>
            </div>
            <Link href="/mypage/">
              <button
                className="shadow bg-green-600 hover:opacity-50 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded-lg"
                type="button"
              >
                マイページへ戻る
              </button>
            </Link>
          </div>
        </div>
      </div>
    </PageContainerWithError>
  );
};

export default userLoginRequired(ExchangesCompletePage);
