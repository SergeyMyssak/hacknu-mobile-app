import { createActionCreator } from '@boot/redux/actions';

import { MyRequestActionTypes } from './types';

export const sendMyRequestRequest = createActionCreator(
  MyRequestActionTypes.SEND_MY_REQUEST_REQUEST,
);
export const sendMyRequestSuccess = createActionCreator(
  MyRequestActionTypes.SEND_MY_REQUEST_SUCCESS,
);
export const sendMyRequestFailure = createActionCreator(
  MyRequestActionTypes.SEND_MY_REQUEST_FAILURE,
);
