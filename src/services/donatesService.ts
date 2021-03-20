import { API } from '@boot/http';
import { DonateModuleTypes, RequestModuleTypes } from '@types';
import { AxiosPromise } from 'axios';

class DonatesService {
  private PATH_USERS: string;
  private PATH_DONATE: string;

  constructor() {
    this.PATH_USERS = '/users';
    this.PATH_DONATE = '/donates';
  }

  public fetchMyDonates = (): AxiosPromise<RequestModuleTypes.IRequest[]> =>
    API.get(`${this.PATH_USERS}/me/donates`);

  public sendMyDonate = (
    data: DonateModuleTypes.IDispatchDonateFormData,
  ): AxiosPromise<RequestModuleTypes.IRequest> => API.post(`${this.PATH_DONATE}`, data);

  public updateMyDonate = (
    id: string,
    data: DonateModuleTypes.IDispatchDonateFormData,
  ): AxiosPromise<RequestModuleTypes.IRequest> => API.put(`${this.PATH_DONATE}/${id}`, data);

  public closeMyDonate = (id: string): AxiosPromise => API.delete(`${this.PATH_DONATE}/${id}`);
}

export const Donates = new DonatesService();
