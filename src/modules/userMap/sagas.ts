import { mapWatcherTreeToSaga } from '@boot/redux/saga';
import { UserMap } from '@services';
import { formatError } from '@utils';
import { AxiosResponse } from 'axios';
import { put } from 'redux-saga/effects';

import { fetchUserMapFailure, fetchUserMapSuccess } from './actions';
import { IFetchUserMapResponse, UserMapActionTypes } from './types';

function* fetchUserMap(): any {
  try {
    const { data }: AxiosResponse<IFetchUserMapResponse> = yield UserMap.fetchUserMap();
    const { geojson } = data;

    yield put(fetchUserMapSuccess(geojson));
  } catch (e) {
    yield put(fetchUserMapFailure(formatError(e, true)));
  }
}

export default mapWatcherTreeToSaga({
  [UserMapActionTypes.FETCH_USER_MAP_REQUEST]: fetchUserMap,
});
