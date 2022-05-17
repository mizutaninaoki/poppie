import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { Flash } from '@/components/common/Flash';
import { MyPageHeader } from '@/components/MyPageHeader';
import { SideMenu } from '@/components/SideMenu';

export type LayoutContainerProps = {
  children: ReactNode;
};

export const LayoutWithSideBar: FC<LayoutContainerProps> = ({ children }) => {
  return (
    <>
      <div className="flex flex-wrap min-h-screen">
        <div className="flex-none bg-gray-50">
          <SideMenu />
        </div>
        <main id="main" className="flex-1">
          <MyPageHeader />
          {children}
        </main>
      </div>
    </>
  );
};
