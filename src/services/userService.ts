import { API } from '@boot/http';
import { IUpdateUserInfoResponse } from '@modules/user/types';
import { AxiosPromise } from 'axios';

class UserService {
  private PATH: string;

  public constructor() {
    this.PATH = '/users';
  }

  public updateUserInfo = (name: string): AxiosPromise<IUpdateUserInfoResponse> =>
    API.put(`${this.PATH}/info`, { name });
}

export const User = new UserService();
