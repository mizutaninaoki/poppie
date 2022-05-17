import { createContext, FC, useEffect, useState } from 'react';
import { gql } from '@apollo/client';

// import { useGetCurrentUserQuery, GetCurrentUserQuery } from '@/generated/graphql';
import { useGetCurrentUserLazyQuery, GetCurrentUserQuery } from '@/generated/graphql';
import { PageContentError } from '@/components/PageContentError';

// verifiedはgraphql-authがログインしているかどうかを判断するパラメータです
gql`
  query GetCurrentUser {
    currentUser: me {
      id
      name
      email
      verified
      isActive
      isAdmin
      company {
        id
        name
      }
    }
  }
`;

type CurrentUserType = GetCurrentUserQuery['currentUser'] & {
  isLoggedIn: boolean;
  isLoaded: boolean;
};

export type AuthContextType = {
  loading: boolean;
  // currentUser: GetCurrentUserQuery['currentUser'];
  currentUser: CurrentUserType;
  // setCurrentUser: (currentUser: GetCurrentUserQuery['currentUser']) => void;
  setCurrentUser: (currentUser: CurrentUserType) => void;
};

export const initialCurrentUser: CurrentUserType = {
  id: '',
  name: '',
  email: '',
  verified: false,
  isActive: false,
  isAdmin: false,
  isLoggedIn: false,
  isLoaded: false,
  company: {
    id: '',
    name: '',
  },
};

export const AuthContext = createContext<AuthContextType>({
  loading: false,
  currentUser: initialCurrentUser,
  setCurrentUser: (data: CurrentUserType) => undefined,
});

export const AuthProvider: FC = ({ children }) => {
  const [currentUserState, setCurrentUserState] =
    useState<CurrentUserType>(initialCurrentUser);

  const [
    getCurrentUser,
    { data, loading: getCurrentUserLoading, error: getCurrentUserError },
  ] = useGetCurrentUserLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted: (res) => {
      // リロード時、userLoginRequiredにてGetCurrentUser完了したかどうかフラグが必要なため、完了時にisLoadedをtrueにしている
      if (res?.currentUser) {
        debugger;
        res.currentUser.id = atob(res.currentUser.id).replace(/UserNode:/, '');
        setCurrentUserState({ ...res.currentUser, isLoaded: true, isLoggedIn: true });
      } else {
        setCurrentUserState({ ...currentUserState, isLoaded: true, isLoggedIn: false });
      }
    },
  });

  if (getCurrentUserError) {
    return <PageContentError error={{ message: getCurrentUserError.message }} />;
  }

  useEffect(() => {
    // 一度currentUserを取得したら、リロードされるまでcurrentUserを再取得はしない
    if (!currentUserState.isLoaded && (getCurrentUserLoading || !data)) {
      getCurrentUser();
    }
  }, []);

  const ctx: AuthContextType = {
    loading: getCurrentUserLoading,
    currentUser: currentUserState,
    setCurrentUser: setCurrentUserState,
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};
