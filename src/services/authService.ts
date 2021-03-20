import { getUniqueId } from 'react-native-device-info';
import { API } from '@boot/http';
import { IAuthorizeResponse, IDispatchAuthorize, IRefreshTokenResponse } from '@modules/auth/types';
import { AxiosPromise } from 'axios';

class AuthService {
  private PATH_AUTH: string;

  constructor() {
    this.PATH_AUTH = '/auth';
  }

  public signIn = ({ phone, hashString }: IDispatchAuthorize): AxiosPromise<IAuthorizeResponse> => {
    const data = { fingerprint: getUniqueId(), phone, hashString };

    return API.post(`${this.PATH_AUTH}/check-code`, data);
  };

  public signOut = (refreshToken: string): AxiosPromise =>
    API.post(`${this.PATH_AUTH}/logout`, { refreshToken });

  public refresh = (refreshToken: string): AxiosPromise<IRefreshTokenResponse> =>
    API.post(`${this.PATH_AUTH}/refresh-token`, {
      fingerprint: getUniqueId(),
      refreshToken,
    });
}

export const Auth = new AuthService();
