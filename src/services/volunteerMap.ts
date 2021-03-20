import { IFetchVolunteerMapResponse } from '@modules/volunteerMap/types';
import { RequestModuleTypes } from '@types';
import axios, { AxiosPromise } from 'axios';

class VolunteerMapService {
  private PATH: string;
  private PATH_VOLUNTEERS: string;

  public constructor() {
    this.PATH = '/requests';
    this.PATH_VOLUNTEERS = '/volunteers';
  }

  public fetchVolunteerMap = (): AxiosPromise<IFetchVolunteerMapResponse> =>
    axios(`${this.PATH}/volunteer-geojson`);

  public acceptRequest = (id): AxiosPromise<RequestModuleTypes.IRequest> =>
    axios.post(`${this.PATH_VOLUNTEERS}/request`, { id });
}

export const VolunteerMap = new VolunteerMapService();
