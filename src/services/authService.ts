import { getUniqueId } from 'react-native-device-info';
import { IAuthorizeResponse, IDispatchAuthorize, IRefreshTokenResponse } from '@modules/auth/types';
import axios, { AxiosPromise } from 'axios';

class AuthService {
  private PATH_AUTH: string;

  constructor() {
    this.PATH_AUTH = '/auth';
  }

  public signIn = ({ phone, hashString }: IDispatchAuthorize): AxiosPromise<IAuthorizeResponse> => {
    const data = { fingerprint: getUniqueId(), phone, hashString };

    return axios.post(`${this.PATH_AUTH}/check-code`, data);
  };

  public signOut = (refreshToken: string): AxiosPromise =>
    axios.post(`${this.PATH_AUTH}/logout`, { refreshToken });

  public refresh = (refreshToken: string): AxiosPromise<IRefreshTokenResponse> =>
    axios.post(`${this.PATH_AUTH}/refresh-token`, {
      fingerprint: getUniqueId(),
      refreshToken,
    });
}

export const Auth = new AuthService();
