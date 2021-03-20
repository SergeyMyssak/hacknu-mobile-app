import { IUserMapState, UserMapActionTypes } from './types';

const initState: IUserMapState = {
  isLoading: false,
};

export const userMapReducer = (state = initState, { type, payload }): IUserMapState => {
  switch (type) {
    case UserMapActionTypes.FETCH_USER_MAP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case UserMapActionTypes.FETCH_USER_MAP_SUCCESS:
      return {
        ...state,
        data: payload,
        isLoading: false,
      };
    case UserMapActionTypes.FETCH_USER_MAP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};
