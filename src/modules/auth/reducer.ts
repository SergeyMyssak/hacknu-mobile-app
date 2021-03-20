import { AuthActionTypes, IAuthState } from './types';

const initState: IAuthState = {
  isLogged: false,

  isSignInLoading: false,
  isSignOutLoading: false,
};

export const authReducer = (state = initState, { type, payload }): IAuthState => {
  switch (type) {
    case AuthActionTypes.SIGN_IN_REQUEST:
      return {
        ...state,
        signInError: undefined,
        isSignInLoading: true,
      };
    case AuthActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        isLogged: true,
        isSignInLoading: false,
      };
    case AuthActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        signInError: payload,
        isSignInLoading: false,
      };

    case AuthActionTypes.SIGN_OUT_REQUEST:
      return {
        ...state,
        signOutError: undefined,
        isSignOutLoading: true,
      };
    case AuthActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        isLogged: false,
        isSignOutLoading: false,
      };
    case AuthActionTypes.SIGN_OUT_FAILURE:
      return {
        ...state,
        signOutError: payload,
        isSignOutLoading: false,
      };

    default:
      return state;
  }
};
