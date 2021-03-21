import { NavigationInjectedProps } from 'react-navigation';
import { DonateModuleTypes } from '@types';

export interface IVolunteerDonatesState {
  data?: DonateModuleTypes.IDonate[];
  isLoading: boolean;
  error?: string;

  acceptLoading: string[];
  rejectLoading: string[];
}

export const VolunteerDonatesActionTypes = {
  FETCH_VOLUNTEER_DONATES_REQUEST: 'FETCH_VOLUNTEER_DONATES_REQUEST',
  FETCH_VOLUNTEER_DONATES_SUCCESS: 'FETCH_VOLUNTEER_DONATES_SUCCESS',
  FETCH_VOLUNTEER_DONATES_FAILURE: 'FETCH_VOLUNTEER_DONATES_FAILURE',

  ACCEPT_DONATE_REQUEST: 'ACCEPT_DONATE_REQUEST',
  ACCEPT_DONATE_SUCCESS: 'ACCEPT_DONATE_SUCCESS',
  ACCEPT_DONATE_FAILURE: 'ACCEPT_DONATE_FAILURE',

  REJECT_DONATE_REQUEST: 'REJECT_DONATE_REQUEST',
  REJECT_DONATE_SUCCESS: 'REJECT_DONATE_SUCCESS',
  REJECT_DONATE_FAILURE: 'REJECT_DONATE_FAILURE',
};

export interface IDispatchRejectDonate extends NavigationInjectedProps {
  id: string;
}
