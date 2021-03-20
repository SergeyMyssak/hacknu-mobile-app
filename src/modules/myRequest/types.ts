import { NavigationInjectedProps } from 'react-navigation';
import { RequestModuleTypes } from '@types';

export interface IMyRequestState {
  data?: RequestModuleTypes.IRequest;
  isLoading: boolean;
  error?: string;
}

export const MyRequestActionTypes = {
  SEND_MY_REQUEST_REQUEST: 'SEND_MY_REQUEST_REQUEST',
  SEND_MY_REQUEST_SUCCESS: 'SEND_MY_REQUEST_SUCCESS',
  SEND_MY_REQUEST_FAILURE: 'SEND_MY_REQUEST_FAILURE',
};

export interface IDispatchSendMyRequest
  extends NavigationInjectedProps,
    RequestModuleTypes.IDispatchRequestFormData {
  resetForm: () => void;
}
