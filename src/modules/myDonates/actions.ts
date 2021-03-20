import { createActionCreator } from '@boot/redux/actions';

import { MyDonatesActionTypes } from './types';

export const fetchMyDonatesRequest = createActionCreator(
  MyDonatesActionTypes.FETCH_MY_DONATES_REQUEST,
);
export const fetchMyDonatesSuccess = createActionCreator(
  MyDonatesActionTypes.FETCH_MY_DONATES_SUCCESS,
);
export const fetchMyDonatesFailure = createActionCreator(
  MyDonatesActionTypes.FETCH_MY_DONATES_FAILURE,
);

export const updateMyDonateRequest = createActionCreator(
  MyDonatesActionTypes.UPDATE_MY_DONATE_REQUEST,
);
export const updateMyDonateSuccess = createActionCreator(
  MyDonatesActionTypes.UPDATE_MY_DONATE_SUCCESS,
);
export const updateMyDonateFailure = createActionCreator(
  MyDonatesActionTypes.UPDATE_MY_DONATE_FAILURE,
);

export const closeMyDonateRequest = createActionCreator(
  MyDonatesActionTypes.CLOSE_MY_DONATE_REQUEST,
);
export const closeMyDonateSuccess = createActionCreator(
  MyDonatesActionTypes.CLOSE_MY_DONATE_SUCCESS,
);
export const closeMyDonateFailure = createActionCreator(
  MyDonatesActionTypes.CLOSE_MY_DONATE_FAILURE,
);
