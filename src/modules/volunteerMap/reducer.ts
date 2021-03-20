import { IVolunteerMapState, VolunteerMapActionTypes } from './types';

const initState: IVolunteerMapState = {
  isLoading: false,
};

export const volunteerMapReducer = (state = initState, { type, payload }): IVolunteerMapState => {
  switch (type) {
    case VolunteerMapActionTypes.FETCH_VOLUNTEER_MAP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case VolunteerMapActionTypes.FETCH_VOLUNTEER_MAP_SUCCESS:
      return {
        ...state,
        data: payload,
        isLoading: false,
      };
    case VolunteerMapActionTypes.FETCH_VOLUNTEER_MAP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};
