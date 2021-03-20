import { NavigationInjectedProps } from 'react-navigation';
import { RequestModuleTypes } from '@types';

export interface IVolunteerRequestsState {
  data?: RequestModuleTypes.IRequest[];
  isLoading: boolean;
  error?: string;

  acceptLoading: string[];
  rejectLoading: string[];
}

export const VolunteerRequestsActionTypes = {
  FETCH_VOLUNTEER_REQUESTS_REQUEST: 'FETCH_VOLUNTEER_REQUESTS_REQUEST',
  FETCH_VOLUNTEER_REQUESTS_SUCCESS: 'FETCH_VOLUNTEER_REQUESTS_SUCCESS',
  FETCH_VOLUNTEER_REQUESTS_FAILURE: 'FETCH_VOLUNTEER_REQUESTS_FAILURE',

  ACCEPT_REQUEST_REQUEST: 'ACCEPT_REQUEST_REQUEST',
  ACCEPT_REQUEST_SUCCESS: 'ACCEPT_REQUEST_SUCCESS',
  ACCEPT_REQUEST_FAILURE: 'ACCEPT_REQUEST_FAILURE',

  REJECT_REQUEST_REQUEST: 'REJECT_REQUEST_REQUEST',
  REJECT_REQUEST_SUCCESS: 'REJECT_REQUEST_SUCCESS',
  REJECT_REQUEST_FAILURE: 'REJECT_REQUEST_FAILURE',
};

export interface IDispatchRejectRequest extends NavigationInjectedProps {
  id: string;
}
