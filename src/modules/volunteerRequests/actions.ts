import { createActionCreator } from '@boot/redux/actions';

import { VolunteerRequestsActionTypes } from './types';

export const fetchVolunteerRequestsRequest = createActionCreator(
  VolunteerRequestsActionTypes.FETCH_VOLUNTEER_REQUESTS_REQUEST,
);
export const fetchMyVolunteerRequestsSuccess = createActionCreator(
  VolunteerRequestsActionTypes.FETCH_VOLUNTEER_REQUESTS_SUCCESS,
);
export const fetchMyVolunteerRequestsFailure = createActionCreator(
  VolunteerRequestsActionTypes.FETCH_VOLUNTEER_REQUESTS_FAILURE,
);

export const acceptRequestRequest = createActionCreator(
  VolunteerRequestsActionTypes.ACCEPT_REQUEST_REQUEST,
);
export const acceptRequestSuccess = createActionCreator(
  VolunteerRequestsActionTypes.ACCEPT_REQUEST_SUCCESS,
);
export const acceptRequestFailure = createActionCreator(
  VolunteerRequestsActionTypes.ACCEPT_REQUEST_FAILURE,
);

export const rejectRequestRequest = createActionCreator(
  VolunteerRequestsActionTypes.REJECT_REQUEST_REQUEST,
);
export const rejectRequestSuccess = createActionCreator(
  VolunteerRequestsActionTypes.REJECT_REQUEST_SUCCESS,
);
export const rejectRequestFailure = createActionCreator(
  VolunteerRequestsActionTypes.REJECT_REQUEST_FAILURE,
);
