import { API } from '@boot/http';
import { RequestModuleTypes } from '@types';
import { AxiosPromise } from 'axios';

class VolunteerRequestsService {
  private PATH: string;
  private PATH_REQUESTS: string;

  constructor() {
    this.PATH = '/volunteers';
    this.PATH_REQUESTS = '/applications';
  }

  public rejectRequest = (id: string): AxiosPromise =>
    API.post(`${this.PATH_REQUESTS}/${id}/return`);

  public fetchVolunteerRequests = (): AxiosPromise<RequestModuleTypes.IRequest[]> =>
    API.get(`${this.PATH}/me/applications`);
}

export const VolunteerRequests = new VolunteerRequestsService();
