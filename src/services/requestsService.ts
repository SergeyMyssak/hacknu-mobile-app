import { API } from '@boot/http';
import { RequestModuleTypes } from '@types';
import { AxiosPromise } from 'axios';

class RequestsService {
  private PATH_USER: string;
  private PATH_REQUEST: string;

  constructor() {
    this.PATH_USER = '/users';
    this.PATH_REQUEST = '/applications';
  }

  public fetchMyRequests = (): AxiosPromise<RequestModuleTypes.IRequest[]> =>
    API.get(`${this.PATH_USER}/me/applications`);

  public sendMyRequest = (
    data: RequestModuleTypes.IDispatchRequestFormData,
  ): AxiosPromise<RequestModuleTypes.IRequest> => API.post(`${this.PATH_REQUEST}`, data);

  public updateMyRequest = (
    id: string,
    data: RequestModuleTypes.IDispatchRequestFormData,
  ): AxiosPromise<RequestModuleTypes.IRequest> => API.put(`${this.PATH_REQUEST}/${id}`, data);

  public closeMyRequest = (id: string): AxiosPromise =>
    API.post(`${this.PATH_REQUEST}/${id}/finish`);
}

export const Requests = new RequestsService();
