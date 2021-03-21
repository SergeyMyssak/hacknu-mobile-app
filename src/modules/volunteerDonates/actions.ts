import { createActionCreator } from '@boot/redux/actions';

import { VolunteerDonatesActionTypes } from './types';

export const fetchVolunteerDonatesRequest = createActionCreator(
  VolunteerDonatesActionTypes.FETCH_VOLUNTEER_DONATES_REQUEST,
);
export const fetchMyVolunteerDonatesSuccess = createActionCreator(
  VolunteerDonatesActionTypes.FETCH_VOLUNTEER_DONATES_SUCCESS,
);
export const fetchMyVolunteerDonatesFailure = createActionCreator(
  VolunteerDonatesActionTypes.FETCH_VOLUNTEER_DONATES_FAILURE,
);

export const acceptDonateRequest = createActionCreator(
  VolunteerDonatesActionTypes.ACCEPT_DONATE_REQUEST,
);
export const acceptDonateSuccess = createActionCreator(
  VolunteerDonatesActionTypes.ACCEPT_DONATE_SUCCESS,
);
export const acceptDonateFailure = createActionCreator(
  VolunteerDonatesActionTypes.ACCEPT_DONATE_FAILURE,
);

export const rejectDonateRequest = createActionCreator(
  VolunteerDonatesActionTypes.REJECT_DONATE_REQUEST,
);
export const rejectDonateSuccess = createActionCreator(
  VolunteerDonatesActionTypes.REJECT_DONATE_SUCCESS,
);
export const rejectDonateFailure = createActionCreator(
  VolunteerDonatesActionTypes.REJECT_DONATE_FAILURE,
);
