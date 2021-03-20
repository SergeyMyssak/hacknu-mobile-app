import { createActionCreator } from '@boot/redux/actions';

import { VolunteerMapActionTypes } from './types';

export const fetchVolunteerMapRequest = createActionCreator(
  VolunteerMapActionTypes.FETCH_VOLUNTEER_MAP_REQUEST,
);
export const fetchVolunteerMapSuccess = createActionCreator(
  VolunteerMapActionTypes.FETCH_VOLUNTEER_MAP_SUCCESS,
);
export const fetchVolunteerMapFailure = createActionCreator(
  VolunteerMapActionTypes.FETCH_VOLUNTEER_MAP_FAILURE,
);
