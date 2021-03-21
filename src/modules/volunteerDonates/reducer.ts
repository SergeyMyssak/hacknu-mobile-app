import { IVolunteerDonatesState, VolunteerDonatesActionTypes } from './types';

const initState: IVolunteerDonatesState = {
  isLoading: false,
  acceptLoading: [],
  rejectLoading: [],
};

export const volunteerDonatesReducer = (
  state = initState,
  { type, payload },
): IVolunteerDonatesState => {
  switch (type) {
    case VolunteerDonatesActionTypes.FETCH_VOLUNTEER_DONATES_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case VolunteerDonatesActionTypes.FETCH_VOLUNTEER_DONATES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    case VolunteerDonatesActionTypes.FETCH_VOLUNTEER_DONATES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case VolunteerDonatesActionTypes.ACCEPT_DONATE_REQUEST:
      return {
        ...state,
        acceptLoading: [...state.acceptLoading, payload],
      };
    case VolunteerDonatesActionTypes.ACCEPT_DONATE_SUCCESS:
      return {
        ...state,
        data: [...(state.data || []), payload.data],
        acceptLoading: state.acceptLoading.filter((item) => item !== payload.id),
      };
    case VolunteerDonatesActionTypes.ACCEPT_DONATE_FAILURE:
      return {
        ...state,
        acceptLoading: state.acceptLoading.filter((item) => item !== payload.id),
      };

    case VolunteerDonatesActionTypes.REJECT_DONATE_REQUEST:
      return {
        ...state,
        rejectLoading: [...state.rejectLoading, payload.id],
      };
    case VolunteerDonatesActionTypes.REJECT_DONATE_SUCCESS:
      return {
        ...state,
        data: (state.data || []).filter((item) => item.id !== payload),
        rejectLoading: state.rejectLoading.filter((item) => item !== payload),
      };
    case VolunteerDonatesActionTypes.REJECT_DONATE_FAILURE:
      return {
        ...state,
        rejectLoading: state.rejectLoading.filter((item) => item !== payload),
      };

    default:
      return state;
  }
};
