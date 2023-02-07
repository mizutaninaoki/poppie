import { FC, ReactNode, useState } from 'react';
import { MyPageHeader } from '@/components/MyPageHeader';
import { SideMenu } from '@/components/SideMenu';

export type LayoutContainerProps = {
  children: ReactNode;
};

export const LayoutWithSideBar: FC<LayoutContainerProps> = ({ children }) => {
  // レスポンシブでのサイドバーの表示切り替え制御
  const [resClass, setResClass] = useState<string>('hidden lg:block lg:w-1/5');

  return (
    <>
      <div className="flex relative">
        <div className={`fixed z-10 ${resClass}`}>
          <SideMenu setResClass={setResClass} />
        </div>
        {/* サイドバーをfixedで浮かせているため、その分のwidthを入れている */}
        <div className="hidden lg:block lg:w-1/5"></div>
        <main id="main" className="flex-1 lg:w-4/5">
          <MyPageHeader setResClass={setResClass} />
          {children}
        </main>
      </div>
    </>
  );
};
