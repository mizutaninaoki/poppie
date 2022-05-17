import { FC, ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from '@/utils/createApolloClient';
import { PageFatalErrorProvider } from '@/providers/PageFatalErrorProvider';
import { PageErrorProvider } from '@/providers/PageErrorProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { FlashProvider } from '@/providers/FlashProvider';
import { HeadComponent } from '@/components/HeadComponent';
import { LayoutWithSideBar } from '@/components/layout/LayoutWithSideBar';

import '../styles/globals.css';

// ネストレイアウトのための型定義
// https://nextjs.org/docs/basic-features/layouts
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ??
    ((page: ReactElement) => <LayoutWithSideBar>{page}</LayoutWithSideBar>);

  return (
    <ApolloProvider client={createApolloClient()}>
      <AuthProvider>
        <FlashProvider>
          <PageFatalErrorProvider>
            <PageErrorProvider>
              {getLayout(
                <>
                  <HeadComponent />
                  <Component {...pageProps} />
                </>,
              )}
            </PageErrorProvider>
          </PageFatalErrorProvider>
        </FlashProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};
export default MyApp;
