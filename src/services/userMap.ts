import { IFetchUserMapResponse } from '@modules/userMap/types';
import axios, { AxiosPromise } from 'axios';

class UserMapService {
  private PATH: string;

  public constructor() {
    this.PATH = '/requests';
  }

  public fetchUserMap = (): AxiosPromise<IFetchUserMapResponse> =>
    axios(`${this.PATH}/public-geojson`);
}

export const UserMap = new UserMapService();
