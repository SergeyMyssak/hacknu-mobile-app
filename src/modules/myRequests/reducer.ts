import { IMyRequestsState, MyRequestsActionTypes } from './types';

const initState: IMyRequestsState = {
  isLoading: false,
  isUpdateMyRequestLoading: false,
  isCloseMyRequestLoading: false,
};

export const myRequestsReducer = (state = initState, { type, payload }): IMyRequestsState => {
  switch (type) {
    case MyRequestsActionTypes.FETCH_MY_REQUESTS_REQUEST:
      return {
        ...state,
        error: undefined,
        isLoading: true,
      };
    case MyRequestsActionTypes.FETCH_MY_REQUESTS_SUCCESS:
      return {
        ...state,
        data: payload,
        isLoading: false,
      };
    case MyRequestsActionTypes.FETCH_MY_REQUESTS_FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    case MyRequestsActionTypes.UPDATE_MY_REQUEST_REQUEST:
      return {
        ...state,
        updateRequestError: undefined,
        isUpdateMyRequestLoading: true,
      };
    case MyRequestsActionTypes.UPDATE_MY_REQUEST_SUCCESS:
      return {
        ...state,
        data: payload,
        isUpdateMyRequestLoading: false,
      };
    case MyRequestsActionTypes.UPDATE_MY_REQUEST_FAILURE:
      return {
        ...state,
        updateRequestError: payload,
        isUpdateMyRequestLoading: false,
      };

    case MyRequestsActionTypes.CLOSE_MY_REQUEST_REQUEST:
      return {
        ...state,
        closeMyRequestError: undefined,
        isCloseMyRequestLoading: true,
      };
    case MyRequestsActionTypes.CLOSE_MY_REQUEST_SUCCESS:
      return {
        ...state,
        data: payload,
        isCloseMyRequestLoading: false,
      };
    case MyRequestsActionTypes.CLOSE_MY_REQUEST_FAILURE:
      return {
        ...state,
        closeMyRequestError: payload,
        isCloseMyRequestLoading: false,
      };

    default:
      return state;
  }
};
