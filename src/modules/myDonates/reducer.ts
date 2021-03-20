import { IMyDonatesState, MyDonatesActionTypes } from './types';

const initState: IMyDonatesState = {
  isLoading: false,
  isUpdateMyDonateLoading: false,
  isCloseMyDonateLoading: false,
};

export const myDonatesReducer = (state = initState, { type, payload }): IMyDonatesState => {
  switch (type) {
    case MyDonatesActionTypes.FETCH_MY_DONATES_REQUEST:
      return {
        ...state,
        error: undefined,
        isLoading: true,
      };
    case MyDonatesActionTypes.FETCH_MY_DONATES_SUCCESS:
      return {
        ...state,
        data: payload,
        isLoading: false,
      };
    case MyDonatesActionTypes.FETCH_MY_DONATES_FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    case MyDonatesActionTypes.UPDATE_MY_DONATE_REQUEST:
      return {
        ...state,
        updateDonateError: undefined,
        isUpdateMyDonateLoading: true,
      };
    case MyDonatesActionTypes.UPDATE_MY_DONATE_SUCCESS:
      return {
        ...state,
        data: payload,
        isUpdateMyDonateLoading: false,
      };
    case MyDonatesActionTypes.UPDATE_MY_DONATE_FAILURE:
      return {
        ...state,
        updateDonateError: payload,
        isUpdateMyDonateLoading: false,
      };

    case MyDonatesActionTypes.CLOSE_MY_DONATE_REQUEST:
      return {
        ...state,
        closeMyDonateError: undefined,
        isCloseMyDonateLoading: true,
      };
    case MyDonatesActionTypes.CLOSE_MY_DONATE_SUCCESS:
      return {
        ...state,
        data: payload,
        isCloseMyDonateLoading: false,
      };
    case MyDonatesActionTypes.CLOSE_MY_DONATE_FAILURE:
      return {
        ...state,
        closeMyDonateError: payload,
        isCloseMyDonateLoading: false,
      };

    default:
      return state;
  }
};
