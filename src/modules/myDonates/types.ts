import { NavigationInjectedProps } from 'react-navigation';
import { DonateModuleTypes } from '@types';

export interface IMyDonatesState {
  data?: DonateModuleTypes.IDonate[];
  isLoading: boolean;
  error?: string;

  isUpdateMyDonateLoading: boolean;
  updateDonateError?: string;

  isCloseMyDonateLoading: boolean;
  closeMyDonateError?: string;
}

export interface IDispatchUpdateMyDonate
  extends NavigationInjectedProps,
    DonateModuleTypes.IDispatchDonateFormData {
  id: string;
}

export interface IDispatchCloseMyDonate {
  id: string;
}

export const MyDonatesActionTypes = {
  FETCH_MY_DONATES_REQUEST: 'FETCH_MY_DONATES_REQUEST',
  FETCH_MY_DONATES_SUCCESS: 'FETCH_MY_DONATES_SUCCESS',
  FETCH_MY_DONATES_FAILURE: 'FETCH_MY_DONATES_FAILURE',

  UPDATE_MY_DONATE_REQUEST: 'UPDATE_MY_DONATE_REQUEST',
  UPDATE_MY_DONATE_SUCCESS: 'UPDATE_MY_DONATE_SUCCESS',
  UPDATE_MY_DONATE_FAILURE: 'UPDATE_MY_DONATE_FAILURE',

  CLOSE_MY_DONATE_REQUEST: 'CLOSE_MY_DONATE_REQUEST',
  CLOSE_MY_DONATE_SUCCESS: 'CLOSE_MY_DONATE_SUCCESS',
  CLOSE_MY_DONATE_FAILURE: 'CLOSE_MY_DONATE_FAILURE',
};
