import { UserRoleType } from '@constants';

export namespace UserModuleTypes {
  export interface IUser {
    id: string;
    phone: string;
    name: string;
    role: UserRoleType;
    createdAt: string;
    updatedAt: string;
  }

  export interface IVolunteer {
    id: string;
    phone: string;
    name: string;
    role: UserRoleType;
    createdAt: string;
    updatedAt: string;
    organization: IVolunteerOrganization;
  }

  export interface IVolunteerOrganization {
    id: string;
    name: string;
    registrationDate?: string;
    mission?: string;
    fieldOfActivity?: string;
    address?: string;
    email?: string;
    createdAt: string;
    updatedAt: string;
    phones?: IVolunteerOrganizationPhone[];
  }

  export interface IVolunteerOrganizationPhone {
    id: string;
    phone: string;
  }

  export interface ITokens {
    accessToken: string;
    refreshToken: string;
  }
}
