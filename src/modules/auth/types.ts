import { NavigationInjectedProps } from 'react-navigation';
import { UserModuleTypes } from '@types';

export interface IAuthState {
  isLogged: boolean;

  isSignInLoading: boolean;
  signInError?: string;

  isSignOutLoading: boolean;
  signOutError?: string;
}

export interface IDispatchAuthorize extends NavigationInjectedProps {
  phone: string;
  hashString: string;
}
export interface IAuthorizeResponse {
  tokens: UserModuleTypes.ITokens;
  user: UserModuleTypes.IUser;
}

export interface IRefreshTokenResponse {
  tokens: UserModuleTypes.ITokens;
}

export const AuthActionTypes = {
  SIGN_IN_REQUEST: 'SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',

  SIGN_OUT_REQUEST: 'SIGN_OUT_REQUEST',
  SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',
  SIGN_OUT_FAILURE: 'SIGN_OUT_FAILURE',
};
