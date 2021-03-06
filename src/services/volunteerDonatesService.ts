import { API } from '@boot/http';
import { DonateModuleTypes } from '@types';
import { AxiosPromise } from 'axios';

class VolunteerDonatesService {
  private PATH: string;
  private PATH_DONATES: string;

  constructor() {
    this.PATH = '/volunteers';
    this.PATH_DONATES = '/donates';
  }

  public rejectRequest = (id: string): AxiosPromise =>
    API.post(`${this.PATH_DONATES}/${id}/return`);

  public fetchVolunteerDonates = (): AxiosPromise<DonateModuleTypes.IDonate[]> =>
    API.get(`${this.PATH}/me/donates`);
}

export const VolunteerDonates = new VolunteerDonatesService();
