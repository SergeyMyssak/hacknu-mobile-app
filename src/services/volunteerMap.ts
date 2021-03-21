import { API } from '@boot/http';
import { IFetchVolunteerMapResponse } from '@modules/volunteerMap/types';
import { RequestModuleTypes } from '@types';
import { AxiosPromise } from 'axios';

class VolunteerMapService {
  private PATH_APPLICATIONS: string;
  private PATH_DONATES: string;
  private PATH_GEOJSONS: string;

  public constructor() {
    this.PATH_APPLICATIONS = '/applications';
    this.PATH_DONATES = '/donates';
    this.PATH_GEOJSONS = '/geojsons';
  }

  public fetchVolunteerMap = (type): AxiosPromise<IFetchVolunteerMapResponse> =>
    API.get(`${this.PATH_GEOJSONS}/protected`, { params: { type } });

  public acceptDonate = (id): AxiosPromise<RequestModuleTypes.IRequest> =>
    API.post(`${this.PATH_DONATES}/${id}/take`);

  public acceptRequest = (id): AxiosPromise<RequestModuleTypes.IRequest> =>
    API.post(`${this.PATH_APPLICATIONS}/${id}/take`);
}

export const VolunteerMap = new VolunteerMapService();
