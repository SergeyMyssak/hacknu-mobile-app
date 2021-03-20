import { NavigationInjectedProps } from 'react-navigation';
import { UserModuleTypes } from '@types';

export interface IUserState {
  data?: UserModuleTypes.IUser;

  isUpdateUserInfoLoading: boolean;
  updateUserInfoError?: string;
}

export interface IDispatchUpdateUserInfo extends NavigationInjectedProps {
  name: string;
}

export interface IUpdateUserInfoResponse {
  name: string;
}

export const UserActionTypes = {
  UPDATE_USER_INFO_REQUEST: 'UPDATE_USER_INFO_REQUEST',
  UPDATE_USER_INFO_SUCCESS: 'UPDATE_USER_INFO_SUCCESS',
  UPDATE_USER_INFO_FAILURE: 'UPDATE_USER_INFO_FAILURE',
};
