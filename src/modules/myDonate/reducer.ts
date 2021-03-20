import { IMyDonateState, MyDonateActionTypes } from './types';

const initState: IMyDonateState = {
  isLoading: false,
};

export const myDonateReducer = (state = initState, { type, payload }): IMyDonateState => {
  switch (type) {
    case MyDonateActionTypes.SEND_MY_DONATE_REQUEST:
      return {
        ...state,
        error: undefined,
        isLoading: true,
      };
    case MyDonateActionTypes.SEND_MY_DONATE_SUCCESS:
      return {
        ...state,
        data: payload,
        isLoading: false,
      };
    case MyDonateActionTypes.SEND_MY_DONATE_FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
