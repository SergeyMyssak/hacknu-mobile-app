import { API } from '@boot/http';
import { IFetchUserMapResponse } from '@modules/userMap/types';
import { AxiosPromise } from 'axios';

class UserMapService {
  private PATH: string;

  public constructor() {
    this.PATH = '/geojsons';
  }

  public fetchUserMap = (): AxiosPromise<IFetchUserMapResponse> => API.get(`${this.PATH}/public`);
}

export const UserMap = new UserMapService();
