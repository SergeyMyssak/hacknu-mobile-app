import { REQUEST_STATUSES, USER_ROLES } from '@constants';
import { RequestModuleTypes, UserModuleTypes } from '@types';

export const isVolunteer = (user?: UserModuleTypes.IUser): boolean =>
  user?.role === USER_ROLES.Volunteer;

export const isUser = (user?: UserModuleTypes.IUser): boolean => user?.role === USER_ROLES.User;

export const isRequestPending = (data?: RequestModuleTypes.IRequest): boolean =>
  data?.status === REQUEST_STATUSES.Pending;

export const isRequestInProgress = (data?: RequestModuleTypes.IRequest): boolean =>
  data?.status === REQUEST_STATUSES.InProgress;

export const isRequestDone = (data?: RequestModuleTypes.IRequest): boolean =>
  data?.status === REQUEST_STATUSES.Done;
