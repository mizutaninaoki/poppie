import { FC, ReactElement, useContext } from 'react';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '@/pages/_app';
import Link from 'next/link';
import { PageContainerWithError } from '@/components/PageContainerWithError';
import { NormalLayout } from '@/components/layout/NormalLayout';
import { AuthContext } from '@/providers/AuthProvider';

const IndexPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  if (currentUser.isLoggedIn) {
    void router.push('/mypage/');
  }

  return (
    <PageContainerWithError>
      <div className="grid place-items-center min-h-screen-except-header">
        <div className="font-bold text-green-400">トップページです</div>
        <Link href="/login/">ログインへ</Link>
      </div>
    </PageContainerWithError>
  );
};

export default IndexPage;

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return <NormalLayout>{page}</NormalLayout>;
};
