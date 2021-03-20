import { mapWatcherTreeToSaga } from '@boot/redux/saga';
import { VolunteerMap } from '@services';
import { formatError } from '@utils';
import { AxiosResponse } from 'axios';
import { put } from 'redux-saga/effects';

import { fetchVolunteerMapFailure, fetchVolunteerMapSuccess } from './actions';
import { VolunteerMapActionTypes } from './types';

function* fetchVolunteerMap(): any {
  try {
    const { data }: AxiosResponse<string> = yield VolunteerMap.fetchVolunteerMap();

    yield put(fetchVolunteerMapSuccess(data));
  } catch (e) {
    yield put(fetchVolunteerMapFailure(formatError(e, true)));
  }
}

export default mapWatcherTreeToSaga({
  [VolunteerMapActionTypes.FETCH_VOLUNTEER_MAP_REQUEST]: fetchVolunteerMap,
});
