import { createActionCreator } from '@boot/redux/actions';

import { UserActionTypes } from './types';

export const updateUserInfoRequest = createActionCreator(UserActionTypes.UPDATE_USER_INFO_REQUEST);
export const updateUserInfoSuccess = createActionCreator(UserActionTypes.UPDATE_USER_INFO_SUCCESS);
export const updateUserInfoFailure = createActionCreator(UserActionTypes.UPDATE_USER_INFO_FAILURE);
