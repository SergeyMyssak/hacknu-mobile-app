import { RequestStatus } from '@constants';
import { UserModuleTypes } from '@types';

export namespace DonateModuleTypes {
  export interface IStatus {
    id: number;
    name: RequestStatus;
  }

  export interface IDonate {
    id: string;
    address: string;
    text: string;
    longitude: string;
    latitude: string;
    createdAt: string;
    updatedAt: string;
    status: IStatus;
    user: UserModuleTypes.IUser;
    category: ICategory;
    volunteer?: UserModuleTypes.IVolunteer;
  }

  export interface ICategory {
    id: number;
    name: string;
  }

  export interface IDonateFormData {
    category: ICategory;
    address: string;
    text: string;
    longitude: string;
    latitude: string;
  }

  export interface IDispatchDonateFormData {
    categoryId: number;
    address: string;
    text: string;
    longitude: string;
    latitude: string;
  }
}
