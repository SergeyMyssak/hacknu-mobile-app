import { createActionCreator } from '@boot/redux/actions';

import { MyDonateActionTypes } from './types';

export const sendMyDonateRequest = createActionCreator(MyDonateActionTypes.SEND_MY_DONATE_REQUEST);
export const sendMyDonateSuccess = createActionCreator(MyDonateActionTypes.SEND_MY_DONATE_SUCCESS);
export const sendMyDonateFailure = createActionCreator(MyDonateActionTypes.SEND_MY_DONATE_FAILURE);
