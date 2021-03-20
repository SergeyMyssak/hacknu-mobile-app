import { RequestStatus } from '@constants';
import { UserModuleTypes } from '@types';

export namespace RequestModuleTypes {
  export interface IRequest {
    id: string;
    address: string;
    need: string;
    problem: string;
    longitude: string;
    latitude: string;
    createdAt: string;
    updatedAt: string;
    status: RequestStatus;
    user: UserModuleTypes.IUser;
    category: ICategory;
    volunteer?: UserModuleTypes.IVolunteer;
  }

  export interface ICategory {
    id: number;
    name: string;
  }

  export interface IPublicRequest {
    id: string;
    need: string;
    createdAt: string;
    updatedAt: string;
    category: ICategory;
  }

  export interface IRequestFormData {
    category: ICategory;
    address: string;
    need: string;
    problem: string;
    longitude: string;
    latitude: string;
  }

  export interface IDispatchRequestFormData {
    categoryId: number;
    address: string;
    need: string;
    problem: string;
    longitude: string;
    latitude: string;
  }
}
