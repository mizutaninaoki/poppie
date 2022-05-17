import { FC, ReactNode } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { AppError } from '@/utils/error';

export type PageContentErrorProps = {
  error: AppError;
};

export const PageContentError: FC<PageContentErrorProps> = ({ error, children }) => {
  const { message } = error;

  const displayMessage: ReactNode = <p className="">{message}</p>;

  return (
    <>
      <PageContainer>
        {/* <ErrorOutlineIcon className={styles.icon} /> */}
        <h1>エラーアイコンを用意する！</h1>
        {displayMessage}
        {children}
      </PageContainer>
    </>
  );
};
