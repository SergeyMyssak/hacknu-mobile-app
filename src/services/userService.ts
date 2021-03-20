import { API } from '@boot/http';
import { IDispatchUpdateUserInfo, IUpdateUserInfoResponse } from '@modules/user/types';
import { AxiosPromise } from 'axios';

class UserService {
  private PATH: string;

  public constructor() {
    this.PATH = '/users';
  }

  public updateUserInfo = (data: IDispatchUpdateUserInfo): AxiosPromise<IUpdateUserInfoResponse> =>
    API.put(`${this.PATH}/info`, data);
}

export const User = new UserService();
