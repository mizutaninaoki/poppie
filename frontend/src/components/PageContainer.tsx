import { FC, ReactNode } from 'react';

export type PageContainerProps = {
  children: ReactNode;
  topPage?: boolean;
};

export const PageContainer: FC<PageContainerProps> = ({ children, topPage }) => {
  return (
    <>
      <div className={topPage ? '' : 'container mx-auto'}>{children}</div>
    </>
  );
};
