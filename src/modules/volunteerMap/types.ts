import { RequestModuleTypes } from '@types';

export interface IVolunteerMapState {
  data?: string;
  requests?: RequestModuleTypes.IRequest[];
  isLoading: boolean;
  error?: boolean;
}

export const VolunteerMapActionTypes = {
  FETCH_VOLUNTEER_MAP_REQUEST: 'FETCH_VOLUNTEER_MAP_REQUEST',
  FETCH_VOLUNTEER_MAP_SUCCESS: 'FETCH_VOLUNTEER_MAP_SUCCESS',
  FETCH_VOLUNTEER_MAP_FAILURE: 'FETCH_VOLUNTEER_MAP_FAILURE',
};

export interface IFetchVolunteerMapResponse {
  geojson: string;
}
