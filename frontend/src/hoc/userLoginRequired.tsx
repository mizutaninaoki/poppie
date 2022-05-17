import { ComponentType, FC, useContext } from 'react';
import { AuthContext } from '@/providers/AuthProvider';
import { useRouter } from 'next/router';
import { PageLoading } from '@/components/PageLoading';

/**
 * ログイン必須ページをラップするHOC
 */

const userLoginRequired = <P extends Record<string, unknown>>(
  Component: ComponentType<P>,
): FC<P> => {
  return function WithUserLoginRequired(props: P): JSX.Element {
    const authContext = useContext(AuthContext);
    const router = useRouter();

    // NOTE: router.isReadyを条件に入れないと、router.push('/login/')でエラーになってしまう?
    if (authContext.loading || !authContext.currentUser.isLoaded || !router.isReady)
      return <PageLoading />;

    // TODO: graphql_auth_statusのverifiedをtrueにする！
    if (authContext.currentUser.isLoggedIn) {
      // ログインしている場合はページを表示
      return <Component {...props} />;
    } else {
      // ログインしてない場合はログインページにリダイレクト
      void router.push('/login/');
      return <PageLoading />;
    }
  };
};

export default userLoginRequired;
