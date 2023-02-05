import { FC, ReactNode } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { AppError } from '@/utils/error';
import { ExclamationIcon } from '@heroicons/react/outline';

import styles from './PageContentError.module.scss';

export type PageContentErrorProps = {
  error: AppError;
};

export const PageContentError: FC<PageContentErrorProps> = ({ error, children }) => {
  const { message } = error;

  const displayMessage: ReactNode = <p className="">{message}</p>;

  return (
    <>
      <PageContainer>
        <div className="h-screen flex justify-center items-center">
          <div className={styles.errorBox}>
            <div className="bg-gray-100 px-12 py-10 rounded-xl">
              <ExclamationIcon className="h-18 w-18 mx-auto mb-2 text-red-500"></ExclamationIcon>
              <div className="text-center">
                <p className="font-bold">申し訳ございません</p>
                <p className="font-bold mb-2">エラーが発生しました</p>
                {displayMessage}
              </div>
              {children}
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
};
