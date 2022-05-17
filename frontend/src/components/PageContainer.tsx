import { FC, ReactNode } from 'react';

export type PageContainerProps = {
  children: ReactNode;
};

export const PageContainer: FC<PageContainerProps> = ({ children }) => {
  return (
    <>
      {/* <div className="container mx-auto pt-except-header"> */}
      <div className="container">{children}</div>
    </>
  );
};
