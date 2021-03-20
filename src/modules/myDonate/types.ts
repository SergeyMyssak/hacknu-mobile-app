import { NavigationInjectedProps } from 'react-navigation';
import { DonateModuleTypes, RequestModuleTypes } from '@types';

export interface IMyDonateState {
  data?: RequestModuleTypes.IRequest;
  isLoading: boolean;
  error?: string;
}

export const MyDonateActionTypes = {
  SEND_MY_DONATE_REQUEST: 'SEND_MY_DONATE_REQUEST',
  SEND_MY_DONATE_SUCCESS: 'SEND_MY_DONATE_SUCCESS',
  SEND_MY_DONATE_FAILURE: 'SEND_MY_DONATE_FAILURE',
};

export interface IDispatchSendMyDonate
  extends NavigationInjectedProps,
    DonateModuleTypes.IDispatchDonateFormData {
  resetForm: () => void;
}
