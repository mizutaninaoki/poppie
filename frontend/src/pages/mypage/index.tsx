import { useRouter } from 'next/router';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import { NextPageWithLayout } from '@/pages/_app';
import userLoginRequired from '@/hoc/userLoginRequired';
import { clearSession } from '@/utils/storage';

const MypagePage: NextPageWithLayout = () => {
  const router = useRouter();

  const onClick = () => {
    clearSession();
    void router.push('/dealings/new/input/');
  };

  return (
    <PageContainerWithError>
      <div className="grid place-items-center min-h-screen-except-header">
        <button className="btn btn-primary" onClick={onClick}>
          ポイントをあげる
        </button>
      </div>
    </PageContainerWithError>
  );
};

export default userLoginRequired(MypagePage);
