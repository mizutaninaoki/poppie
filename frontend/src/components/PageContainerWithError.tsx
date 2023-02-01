import { FC, ReactNode } from 'react';
import { Flash } from '@/components/common/Flash';
import { PageError } from '@/components/common/PageError';
import { usePageFatalError } from '@/hooks/usePageFatalError';
import { PageContainer } from '@/components/PageContainer';
import { PageContentError } from '@/components/PageContentError';

export type PageContainerProps = {
  children: ReactNode;
  topPage?: boolean;
};

export const PageContainerWithError: FC<PageContainerProps> = ({ children, topPage }) => {
  const { pageFatalError } = usePageFatalError();
  // pageFatalErrorがある場合はコンテンツエラーを表示して終わる
  if (pageFatalError) {
    return <PageContentError error={{ message: pageFatalError.message }} />;
  }

  return (
    <>
      <PageContainer topPage={topPage}>
        <Flash />
        <PageError />
        {children}
      </PageContainer>
    </>
  );
};
