import { USER_ROLES } from '@constants';
import { UserModuleTypes } from '@types';

export const isVolunteer = (user?: UserModuleTypes.IUser): boolean =>
  user?.role === USER_ROLES.Volunteer;

export const isUser = (user?: UserModuleTypes.IUser): boolean => user?.role === USER_ROLES.User;
