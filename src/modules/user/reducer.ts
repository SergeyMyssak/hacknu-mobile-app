import _ from 'lodash';

import { IUserState, UserActionTypes } from './types';

const initState: IUserState = {
  isUpdateUserInfoLoading: false,
};

export const userReducer = (state = initState, { type, payload }): IUserState => {
  switch (type) {
    case UserActionTypes.UPDATE_USER_INFO_REQUEST:
      return {
        ...state,
        isUpdateUserInfoLoading: true,
      };
    case UserActionTypes.UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        data: _.merge(state.data, payload),
        isUpdateUserInfoLoading: false,
      };
    case UserActionTypes.UPDATE_USER_INFO_FAILURE:
      return {
        ...state,
        updateUserInfoError: payload,
        isUpdateUserInfoLoading: false,
      };

    default:
      return state;
  }
};
