import { RequestModuleTypes } from '@types';
import axios, { AxiosPromise } from 'axios';

class VolunteerRequestsService {
  private PATH: string;

  constructor() {
    this.PATH = '/volunteers';
  }

  public rejectRequest = (id: string): AxiosPromise => axios.delete(`${this.PATH}/request/${id}`);

  public fetchVolunteerRequests = (): AxiosPromise<RequestModuleTypes.IRequest[]> =>
    axios(`${this.PATH}/requests?status=InProgress`);
}

export const VolunteerRequests = new VolunteerRequestsService();
