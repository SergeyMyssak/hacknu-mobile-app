import { IStatusBarState, StatusBarActionTypes } from './types';

const initState: IStatusBarState = {
  backgroundColor: '#FFF',
  barStyle: 'dark-content',
  animated: true,
};

export const statusBarReducer = (state = initState, { type, payload }): IStatusBarState => {
  switch (type) {
    case StatusBarActionTypes.HANDLE_STATUS_BAR:
      return {
        ...state,
        backgroundColor: payload.backgroundColor,
        barStyle: payload.barStyle,
        animated: payload.animated,
      };

    default:
      return state;
  }
};
