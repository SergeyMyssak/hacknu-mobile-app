import { createActionCreator } from '@boot/redux/actions';

import { StatusBarActionTypes } from './types';

export const setStatusBarAction = createActionCreator(StatusBarActionTypes.HANDLE_STATUS_BAR);
