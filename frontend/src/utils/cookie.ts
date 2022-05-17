import Cookies from 'js-cookie';

export const setTokensToCookie = (token: string, refreshToken: string) => {
  Cookies.set('token', token, {
    expires: 5 / 1440, // tokenの有効期限は5分。5分後に自動的にcookieから削除される。
  }); // 5分(24時間は1440分) TODO: httpOnlyつける

  Cookies.set('refreshToken', refreshToken, {
    expires: 7,
  }); // refreshTokenの有効期限は7日間。7日後に自動的にcookieから削除される。https通信のみ有効。
};
