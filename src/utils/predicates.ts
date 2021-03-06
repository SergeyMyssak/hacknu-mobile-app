import { REQUEST_STATUSES, USER_ROLES, VOLUNTEER_MAP_TYPES } from '@constants';
import { DonateModuleTypes, RequestModuleTypes, UserModuleTypes } from '@types';

export const isVolunteer = (user?: UserModuleTypes.IUser): boolean =>
  user?.role.name === USER_ROLES.Volunteer;

export const isUser = (user?: UserModuleTypes.IUser): boolean =>
  user?.role.name === USER_ROLES.User;

export const isRequestPending = (
  data?: RequestModuleTypes.IRequest | DonateModuleTypes.IDonate,
): boolean => data?.status.name === REQUEST_STATUSES.Pending;

export const isRequestInProgress = (
  data?: RequestModuleTypes.IRequest | DonateModuleTypes.IDonate,
): boolean => data?.status.name === REQUEST_STATUSES.InProgress;

export const isRequestDone = (
  data?: RequestModuleTypes.IRequest | DonateModuleTypes.IDonate,
): boolean => data?.status.name === REQUEST_STATUSES.Done;

export const isVolunteerMapApplications = (type: string): boolean =>
  type === VOLUNTEER_MAP_TYPES.applications;

export const isVolunteerMapDonations = (type: string): boolean =>
  type === VOLUNTEER_MAP_TYPES.donations;
