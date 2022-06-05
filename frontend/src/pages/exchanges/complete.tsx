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
      <div className="grid place-items-center">
        <h1>景品交換完了</h1>
        <div className="w-full text-center">
          <div>
            <h4>景品の交換取引が完了しました。</h4>
            <p>会社担当ものより後日景品が渡されるまで少々お待ちください。</p>
          </div>
          <Link href="/mypage/">
            <button className="btn btn-primary" type="button">
              マイページへ戻る
            </button>
          </Link>
        </div>
      </div>
    </PageContainerWithError>
  );
};

export default userLoginRequired(ExchangesCompletePage);
