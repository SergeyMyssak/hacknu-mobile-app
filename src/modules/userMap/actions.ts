import { createActionCreator } from '@boot/redux/actions';

import { UserMapActionTypes } from './types';

export const fetchUserMapRequest = createActionCreator(UserMapActionTypes.FETCH_USER_MAP_REQUEST);
export const fetchUserMapSuccess = createActionCreator(UserMapActionTypes.FETCH_USER_MAP_SUCCESS);
export const fetchUserMapFailure = createActionCreator(UserMapActionTypes.FETCH_USER_MAP_FAILURE);
