import { IVolunteerRequestsState, VolunteerRequestsActionTypes } from './types';

const initState: IVolunteerRequestsState = {
  isLoading: false,
  acceptLoading: [],
  rejectLoading: [],
};

export const volunteerRequestsReducer = (
  state = initState,
  { type, payload },
): IVolunteerRequestsState => {
  switch (type) {
    case VolunteerRequestsActionTypes.FETCH_VOLUNTEER_REQUESTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case VolunteerRequestsActionTypes.FETCH_VOLUNTEER_REQUESTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    case VolunteerRequestsActionTypes.FETCH_VOLUNTEER_REQUESTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case VolunteerRequestsActionTypes.ACCEPT_REQUEST_REQUEST:
      return {
        ...state,
        acceptLoading: [...state.acceptLoading, payload],
      };
    case VolunteerRequestsActionTypes.ACCEPT_REQUEST_SUCCESS:
      return {
        ...state,
        data: [...(state.data || []), payload.data],
        acceptLoading: state.acceptLoading.filter((item) => item !== payload.id),
      };
    case VolunteerRequestsActionTypes.ACCEPT_REQUEST_FAILURE:
      return {
        ...state,
        acceptLoading: state.acceptLoading.filter((item) => item !== payload.id),
      };

    case VolunteerRequestsActionTypes.REJECT_REQUEST_REQUEST:
      return {
        ...state,
        rejectLoading: [...state.rejectLoading, payload.id],
      };
    case VolunteerRequestsActionTypes.REJECT_REQUEST_SUCCESS:
      return {
        ...state,
        data: (state.data || []).filter((item) => item.id !== payload),
        rejectLoading: state.rejectLoading.filter((item) => item !== payload),
      };
    case VolunteerRequestsActionTypes.REJECT_REQUEST_FAILURE:
      return {
        ...state,
        rejectLoading: state.rejectLoading.filter((item) => item !== payload),
      };

    default:
      return state;
  }
};
