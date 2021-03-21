import { NavigationInjectedProps } from 'react-navigation';
import { RequestModuleTypes } from '@types';

export interface IMyRequestsState {
  data?: RequestModuleTypes.IRequest[];
  isLoading: boolean;
  error?: string;

  isUpdateMyRequestLoading: boolean;
  updateRequestError?: string;

  isCloseMyRequestLoading: boolean;
  closeMyRequestError?: string;
}

export interface IDispatchUpdateMyRequest
  extends NavigationInjectedProps,
    RequestModuleTypes.IDispatchRequestFormData {
  id: string;
}

export interface IDispatchCloseMyRequest extends NavigationInjectedProps {
  id: string;
}

export const MyRequestsActionTypes = {
  FETCH_MY_REQUESTS_REQUEST: 'FETCH_MY_REQUESTS_REQUEST',
  FETCH_MY_REQUESTS_SUCCESS: 'FETCH_MY_REQUESTS_SUCCESS',
  FETCH_MY_REQUESTS_FAILURE: 'FETCH_MY_REQUESTS_FAILURE',

  UPDATE_MY_REQUEST_REQUEST: 'UPDATE_MY_REQUEST_REQUEST',
  UPDATE_MY_REQUEST_SUCCESS: 'UPDATE_MY_REQUEST_SUCCESS',
  UPDATE_MY_REQUEST_FAILURE: 'UPDATE_MY_REQUEST_FAILURE',

  CLOSE_MY_REQUEST_REQUEST: 'CLOSE_MY_REQUEST_REQUEST',
  CLOSE_MY_REQUEST_SUCCESS: 'CLOSE_MY_REQUEST_SUCCESS',
  CLOSE_MY_REQUEST_FAILURE: 'CLOSE_MY_REQUEST_FAILURE',
};
