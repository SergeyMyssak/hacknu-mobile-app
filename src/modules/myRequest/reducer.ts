import { IMyRequestState, MyRequestActionTypes } from './types';

const initState: IMyRequestState = {
  isLoading: false,
};

export const myRequestReducer = (state = initState, { type, payload }): IMyRequestState => {
  switch (type) {
    case MyRequestActionTypes.SEND_MY_REQUEST_REQUEST:
      return {
        ...state,
        error: undefined,
        isLoading: true,
      };
    case MyRequestActionTypes.SEND_MY_REQUEST_SUCCESS:
      return {
        ...state,
        data: payload,
        isLoading: false,
      };
    case MyRequestActionTypes.SEND_MY_REQUEST_FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
