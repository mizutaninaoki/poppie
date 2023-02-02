import { createContext, FC, useEffect, useState } from 'react';
import { gql } from '@apollo/client';

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
        ...CurrentCompany
      }
      account {
        ...CurrentAccount
      }
      profile {
        ...CurrentProfile
      }
    }
  }

  fragment CurrentAccount on AccountType {
    id
    givablePoint
    receivedPoint
  }

  fragment CurrentProfile on ProfileType {
    id
    department
    comment
    imageUrl
  }
`;

type CurrentUserType = GetCurrentUserQuery['currentUser'] & {
  isLoggedIn: boolean;
  isLoaded: boolean;
};

export type AuthContextType = {
  loading: boolean;
  currentUser: CurrentUserType;
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
    point: 0,
  },
  account: {
    id: '',
    givablePoint: 0,
    receivedPoint: 0,
  },
  profile: {
    id: '',
    department: '',
    comment: '',
    imageUrl: '',
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

  // Providerの中のLazyQueryはなぜか、ページ遷移毎に勝手に（getCurrentUserを呼び出さなくても）フェッチが実行されてしまう。
  // そのため、useEffectの中で初回ロード時だけ呼び出し、omCompletedを使わず、currentUserの値をstateに保存しています。
  const [
    getCurrentUser,
    { data, loading: getCurrentUserLoading, error: getCurrentUserError },
  ] = useGetCurrentUserLazyQuery({
    fetchPolicy: 'network-only',
  });

  if (getCurrentUserError) {
    return <PageContentError error={{ message: getCurrentUserError.message }} />;
  }

  useEffect(() => {
    const initialGetCurrentUser = async () => {
      if (!currentUserState.isLoaded && (getCurrentUserLoading || !data)) {
        const res = await getCurrentUser();
        if (res?.data?.currentUser) {
          const decodedUserId = window
            .atob(res.data.currentUser.id)
            .replace(/UserNode:/, '');
          setCurrentUserState({
            ...res.data.currentUser,
            id: decodedUserId,
            isLoaded: true,
            isLoggedIn: true,
          });
        } else {
          setCurrentUserState({ ...currentUserState, isLoaded: true, isLoggedIn: false });
        }
      }
    };

    initialGetCurrentUser();
  }, []);

  const ctx: AuthContextType = {
    loading: getCurrentUserLoading,
    currentUser: currentUserState,
    setCurrentUser: setCurrentUserState,
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};
