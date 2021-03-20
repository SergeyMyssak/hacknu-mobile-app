import { mapWatcherTreeToSaga } from '@boot/redux/saga';
import { VolunteerMap, VolunteerRequests } from '@services';
import { RequestModuleTypes } from '@types';
import { formatError } from '@utils';
import { AxiosResponse } from 'axios';
import { put } from 'redux-saga/effects';

import {
  acceptRequestFailure,
  acceptRequestSuccess,
  fetchMyVolunteerRequestsFailure,
  fetchMyVolunteerRequestsSuccess,
  rejectRequestFailure,
  rejectRequestSuccess,
} from './actions';
import { IDispatchRejectRequest, VolunteerRequestsActionTypes } from './types';

function* fetchVolunteerRequests(): any {
  try {
    const {
      data,
    }: AxiosResponse<
      RequestModuleTypes.IRequest[]
    > = yield VolunteerRequests.fetchVolunteerRequests();

    yield put(fetchMyVolunteerRequestsSuccess(data));
  } catch (e) {
    yield put(fetchMyVolunteerRequestsFailure(formatError(e, true)));
  }
}

function* acceptRequest(action): any {
  const { payload }: { payload: string } = action;

  try {
    const { data }: AxiosResponse<RequestModuleTypes.IRequest> = yield VolunteerMap.acceptRequest(
      payload,
    );

    yield put(acceptRequestSuccess({ id: payload, data }));
  } catch (e) {
    formatError(e, true);
    yield put(acceptRequestFailure({ id: payload }));
  }
}

function* rejectRequest(action): any {
  const { payload }: { payload: IDispatchRejectRequest } = action;
  const { id, navigation } = payload;
  const { goBack } = navigation;

  try {
    yield VolunteerRequests.rejectRequest(id);

    goBack();
    yield put(rejectRequestSuccess(id));
  } catch (e) {
    formatError(e, true);
    yield put(rejectRequestFailure(id));
  }
}

export default mapWatcherTreeToSaga({
  [VolunteerRequestsActionTypes.FETCH_VOLUNTEER_REQUESTS_REQUEST]: fetchVolunteerRequests,
  [VolunteerRequestsActionTypes.ACCEPT_REQUEST_REQUEST]: acceptRequest,
  [VolunteerRequestsActionTypes.REJECT_REQUEST_REQUEST]: rejectRequest,
});
