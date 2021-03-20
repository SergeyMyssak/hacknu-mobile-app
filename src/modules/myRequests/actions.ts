import { createActionCreator } from '@boot/redux/actions';

import { MyRequestsActionTypes } from './types';

export const fetchMyRequestsRequest = createActionCreator(
  MyRequestsActionTypes.FETCH_MY_REQUESTS_REQUEST,
);
export const fetchMyRequestsSuccess = createActionCreator(
  MyRequestsActionTypes.FETCH_MY_REQUESTS_SUCCESS,
);
export const fetchMyRequestsFailure = createActionCreator(
  MyRequestsActionTypes.FETCH_MY_REQUESTS_FAILURE,
);

export const updateMyRequestRequest = createActionCreator(
  MyRequestsActionTypes.UPDATE_MY_REQUEST_REQUEST,
);
export const updateMyRequestSuccess = createActionCreator(
  MyRequestsActionTypes.UPDATE_MY_REQUEST_SUCCESS,
);
export const updateMyRequestFailure = createActionCreator(
  MyRequestsActionTypes.UPDATE_MY_REQUEST_FAILURE,
);

export const closeMyRequestRequest = createActionCreator(
  MyRequestsActionTypes.CLOSE_MY_REQUEST_REQUEST,
);
export const closeMyRequestSuccess = createActionCreator(
  MyRequestsActionTypes.CLOSE_MY_REQUEST_SUCCESS,
);
export const closeMyRequestFailure = createActionCreator(
  MyRequestsActionTypes.CLOSE_MY_REQUEST_FAILURE,
);
