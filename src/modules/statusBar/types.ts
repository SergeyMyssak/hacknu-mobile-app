import { StatusBarStyle } from 'react-native';

export interface IStatusBarState {
  backgroundColor: string;
  barStyle: StatusBarStyle;
  animated: boolean;
}

export const StatusBarActionTypes = {
  HANDLE_STATUS_BAR: 'HANDLE_STATUS_BAR',
};
