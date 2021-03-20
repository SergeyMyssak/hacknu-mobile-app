import { API } from '@boot/http';
import { RequestModuleTypes } from '@types';
import { AxiosPromise } from 'axios';

class RequestsService {
  private PATH_User: string;
  private PATH_Request: string;

  constructor() {
    this.PATH_User = '/users';
    this.PATH_Request = '/applications';
  }

  public fetchMyRequests = (): AxiosPromise<RequestModuleTypes.IRequest[]> =>
    API.get(`${this.PATH_User}/me/applications`);

  public sendMyRequest = (
    data: RequestModuleTypes.IDispatchRequestFormData,
  ): AxiosPromise<RequestModuleTypes.IRequest> => API.post(`${this.PATH_Request}`, data);

  public updateMyRequest = (
    id: string,
    data: RequestModuleTypes.IDispatchRequestFormData,
  ): AxiosPromise<RequestModuleTypes.IRequest> => API.put(`${this.PATH_Request}/${id}`, data);

  public closeMyRequest = (id: string): AxiosPromise => API.delete(`${this.PATH_Request}/${id}`);
}

export const Requests = new RequestsService();
