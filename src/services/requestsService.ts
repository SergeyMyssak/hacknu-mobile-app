import { RequestModuleTypes } from '@types';
import axios, { AxiosPromise } from 'axios';

class RequestsService {
  private PATH_Request: string;

  constructor() {
    this.PATH_Request = '/requests';
  }

  public fetchMyRequests = (): AxiosPromise<RequestModuleTypes.IRequest[]> =>
    axios(`${this.PATH_Request}`);

  public sendMyRequest = (
    data: RequestModuleTypes.IDispatchRequestFormData,
  ): AxiosPromise<RequestModuleTypes.IRequest> => axios.post(`${this.PATH_Request}`, data);

  public updateMyRequest = (
    id: string,
    data: RequestModuleTypes.IDispatchRequestFormData,
  ): AxiosPromise<RequestModuleTypes.IRequest> => axios.post(`${this.PATH_Request}/${id}`, data);

  public closeMyRequest = (id: string): AxiosPromise =>
    axios.post(`${this.PATH_Request}/close`, { id });
}

export const Requests = new RequestsService();
