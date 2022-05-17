import { FC, ReactNode } from 'react';
// import { Flash } from '@/components/common/Flash';
import { Header } from '@/components/Header';

export type LayoutContainerProps = {
  children: ReactNode;
};

export const NormalLayout: FC<LayoutContainerProps> = ({ children }) => {
  return (
    <>
      {/* <Flash /> */}
      <Header />
      <main id="main">{children}</main>;
    </>
  );
};
