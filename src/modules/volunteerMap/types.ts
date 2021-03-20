import { VolunteerMapType } from '@constants';
import { RequestModuleTypes } from '@types';

export interface IVolunteerMapState {
  geojson?: string;
  data?: RequestModuleTypes.IRequest[];
  isLoading: boolean;
  error?: boolean;
}

export const VolunteerMapActionTypes = {
  FETCH_VOLUNTEER_MAP_REQUEST: 'FETCH_VOLUNTEER_MAP_REQUEST',
  FETCH_VOLUNTEER_MAP_SUCCESS: 'FETCH_VOLUNTEER_MAP_SUCCESS',
  FETCH_VOLUNTEER_MAP_FAILURE: 'FETCH_VOLUNTEER_MAP_FAILURE',
};

export interface IDispatchFetchVolunteerMap {
  type: VolunteerMapType;
}

export interface IFetchVolunteerMapResponse {
  geojson: string;
}
