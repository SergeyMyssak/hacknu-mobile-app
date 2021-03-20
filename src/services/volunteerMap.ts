import { API } from '@boot/http';
import { IFetchVolunteerMapResponse } from '@modules/volunteerMap/types';
import { RequestModuleTypes } from '@types';
import { AxiosPromise } from 'axios';

class VolunteerMapService {
  private PATH: string;
  private PATH_GEOJSONS: string;

  public constructor() {
    this.PATH = '/applications';
    this.PATH_GEOJSONS = '/geojsons';
  }

  public fetchVolunteerMap = (type): AxiosPromise<IFetchVolunteerMapResponse> =>
    API.get(`${this.PATH_GEOJSONS}/protected`, { params: { type } });

  public acceptRequest = (id): AxiosPromise<RequestModuleTypes.IRequest> =>
    API.post(`${this.PATH}/${id}/take`);
}

export const VolunteerMap = new VolunteerMapService();
