import { ApolloClient, from, HttpLink, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { InMemoryCache } from '@apollo/client';
import { setTokensToCookie } from '@/utils/cookie';
import Cookies from 'js-cookie';

const REFRESH_TOKEN = `
  mutation RefreshToken($input: RefreshInput!) {
    refreshToken(input: $input) {
      payload
      token
      refreshToken
    }
  }
`;

export function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  const getNewToken = async (refreshTokenStr: string) => {
    try {
      // apolloインスタンス生成前のため、fetchで投げる
      const response = await fetch(`http://localhost:8000/graphql`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          query: REFRESH_TOKEN,
          variables: {
            input: {
              refreshToken: refreshTokenStr,
            },
          },
        }),
      });

      const res = await response.json();
      // レスポンスがエラーの時はcatchに行かずに、responseの中にエラーオブジェクトが入っている
      if (res.errors) throw res.errors;
      // payloadの中にはemail,exp,origIatが入っている
      const { token, refreshToken, payload } = res.data?.refreshToken;
      setTokensToCookie(token, refreshToken);
      return Cookies.get('token');
    } catch (e) {
      throw e;
    }
  };

  const port = 8000;
  const uri = `http://localhost:${port}/graphql`;
  const httpLink = new HttpLink({
    uri,
  });

  const authMiddleware = setContext(async (_, { headers }) => {
    const token = Cookies.get('token'); // クッキーの期限が切れたらtokenは破棄されて取得できない
    const refreshToken = Cookies.get('refreshToken');

    if (token) {
      return {
        headers: {
          ...headers,
          Authorization: `JWT ${token}`,
        },
      };
    } else if (refreshToken) {
      const newToken = await getNewToken(refreshToken);

      return {
        headers: {
          ...headers,
          Authorization: `JWT ${newToken}`,
        },
      };
    } else {
      return {
        headers: {
          ...headers,
          Authorization: '',
        },
      };
    }
  });

  const client = new ApolloClient({
    link: from([authMiddleware, httpLink]),
    // credentials: "include",
    cache: new InMemoryCache(),
    resolvers: {},
  });

  return client;
}
