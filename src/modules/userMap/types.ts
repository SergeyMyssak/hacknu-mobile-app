export interface IUserMapState {
  data?: string;
  isLoading: boolean;
  error?: boolean;
}

export const UserMapActionTypes = {
  FETCH_USER_MAP_REQUEST: 'FETCH_USER_MAP_REQUEST',
  FETCH_USER_MAP_SUCCESS: 'FETCH_USER_MAP_SUCCESS',
  FETCH_USER_MAP_FAILURE: 'FETCH_USER_MAP_FAILURE',
};

export interface IFetchUserMapResponse {
  geojson: string;
}
