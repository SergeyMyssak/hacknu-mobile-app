import { mapWatcherTreeToSaga } from '@boot/redux/saga';
import { VolunteerDonates, VolunteerMap } from '@services';
import { DonateModuleTypes } from '@types';
import { formatError } from '@utils';
import { AxiosResponse } from 'axios';
import { put } from 'redux-saga/effects';

import {
  acceptDonateFailure,
  acceptDonateSuccess,
  fetchMyVolunteerDonatesFailure,
  fetchMyVolunteerDonatesSuccess,
  rejectDonateFailure,
  rejectDonateSuccess,
} from './actions';
import { IDispatchRejectDonate, VolunteerDonatesActionTypes } from './types';

function* fetchVolunteerDonates(): any {
  try {
    const {
      data,
    }: AxiosResponse<DonateModuleTypes.IDonate[]> = yield VolunteerDonates.fetchVolunteerDonates();

    yield put(fetchMyVolunteerDonatesSuccess(data));
  } catch (e) {
    yield put(fetchMyVolunteerDonatesFailure(formatError(e, true)));
  }
}

function* acceptDonate(action): any {
  const { payload }: { payload: string } = action;

  try {
    const { data }: AxiosResponse<DonateModuleTypes.IDonate> = yield VolunteerMap.acceptDonate(
      payload,
    );

    yield put(acceptDonateSuccess({ id: payload, data }));
  } catch (e) {
    formatError(e, true);
    yield put(acceptDonateFailure({ id: payload }));
  }
}

function* rejectRequest(action): any {
  const { payload }: { payload: IDispatchRejectDonate } = action;
  const { id, navigation } = payload;
  const { goBack } = navigation;

  try {
    yield VolunteerDonates.rejectRequest(id);

    goBack();
    yield put(rejectDonateSuccess(id));
  } catch (e) {
    formatError(e, true);
    yield put(rejectDonateFailure(id));
  }
}

export default mapWatcherTreeToSaga({
  [VolunteerDonatesActionTypes.FETCH_VOLUNTEER_DONATES_REQUEST]: fetchVolunteerDonates,
  [VolunteerDonatesActionTypes.ACCEPT_DONATE_REQUEST]: acceptDonate,
  [VolunteerDonatesActionTypes.REJECT_DONATE_REQUEST]: rejectRequest,
});
