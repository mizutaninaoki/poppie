import { useCallback, useContext } from 'react';
import { gql, ApolloError } from '@apollo/client';
import { useTokenAuthMutation } from '@/generated/graphql';
import { LoginFormDataType } from '@/components/LoginForm';
import { setTokensToCookie } from '@/utils/cookie';
import { AuthContext } from '@/providers/AuthProvider';

gql`
  mutation TokenAuth($input: ObtainJSONWebTokenInput!) {
    tokenAuth(input: $input) {
      token
      refreshToken
      user {
        id
        name
        email
        isActive
        isAdmin
        company {
          id
          name
          point
        }
        account {
          id
          givablePoint
          receivedPoint
        }
      }
    }
  }
`;

type Returning = {
  login: (formData: LoginFormDataType) => Promise<boolean>;
  loginLoading: boolean;
  loginError: ApolloError | undefined;
};

export function useLogin(): Returning {
  const authContext = useContext(AuthContext);

  const [tokenAuth, { loading: tokenAuthLoading, error: tokenAuthError }] =
    useTokenAuthMutation();

  const login = useCallback(
    async (formData: LoginFormDataType): Promise<boolean> => {
      try {
        const res = await tokenAuth({
          variables: {
            input: {
              email: formData.email,
              password: formData.password,
            },
          },
        });

        if (res.data?.tokenAuth?.user) {
          // const { token, refreshToken, success, errors } = res.data.tokenAuth;
          const { token, refreshToken } = res.data.tokenAuth;
          setTokensToCookie(token, refreshToken);

          const { id, email, name, isAdmin, isActive, company, account } = res.data.tokenAuth.user;
          authContext.setCurrentUser({
            id,
            email,
            name,
            isAdmin,
            isActive,
            company,
            account,
            verified: true,
            isLoaded: true,
            isLoggedIn: true,
          });
          return true;
          // TODO: companies/[companyId]に遷移させるためにcompany.idをわざわざ返す必要ない？
          // return res.data.tokenAuth.user.company.id;
        }

        return false;
      } catch (authError) {
        console.error(authError);
        return false;
      }
    },
    [tokenAuth],
  );

  return { login, loginLoading: tokenAuthLoading, loginError: tokenAuthError };
}
