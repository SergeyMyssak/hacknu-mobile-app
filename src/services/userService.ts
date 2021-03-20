import { IDispatchUpdateUserInfo, IUpdateUserInfoResponse } from '@modules/user/types';
import axios, { AxiosPromise } from 'axios';

class UserService {
  private PATH: string;

  public constructor() {
    this.PATH = '/users';
  }

  public updateUserInfo = (data: IDispatchUpdateUserInfo): AxiosPromise<IUpdateUserInfoResponse> =>
    axios.post(`${this.PATH}/info`, data);
}

export const User = new UserService();
