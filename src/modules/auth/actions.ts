import { createActionCreator } from '@boot/redux/actions';

import { AuthActionTypes } from './types';

export const signInRequest = createActionCreator(AuthActionTypes.SIGN_IN_REQUEST);
export const signInSuccess = createActionCreator(AuthActionTypes.SIGN_IN_SUCCESS);
export const signInFailure = createActionCreator(AuthActionTypes.SIGN_IN_FAILURE);

export const signOutRequest = createActionCreator(AuthActionTypes.SIGN_OUT_REQUEST);
export const signOutSuccess = createActionCreator(AuthActionTypes.SIGN_OUT_SUCCESS);
export const signOutFailure = createActionCreator(AuthActionTypes.SIGN_OUT_FAILURE);
