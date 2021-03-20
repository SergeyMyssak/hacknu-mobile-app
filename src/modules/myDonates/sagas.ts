import { mapWatcherTreeToSaga } from '@boot/redux/saga';
import { AppState } from '@modules/reducers';
import { Donates } from '@services';
import { DonateModuleTypes } from '@types';
import { formatError } from '@utils';
import { AxiosResponse } from 'axios';
import { put, select } from 'redux-saga/effects';

import {
  closeMyDonateFailure,
  closeMyDonateSuccess,
  fetchMyDonatesFailure,
  fetchMyDonatesSuccess,
  updateMyDonateFailure,
  updateMyDonateSuccess,
} from './actions';
import { IDispatchCloseMyDonate, IDispatchUpdateMyDonate, MyDonatesActionTypes } from './types';

function* fetchMyDonates(): any {
  try {
    const { data }: AxiosResponse<DonateModuleTypes.IDonate[]> = yield Donates.fetchMyDonates();

    yield put(fetchMyDonatesSuccess(data));
  } catch (e) {
    yield put(fetchMyDonatesFailure(formatError(e, true)));
  }
}

function* updateMyDonate(action): any {
  const { payload }: { payload: IDispatchUpdateMyDonate } = action;
  const { navigation, id, ...donate } = payload;
  const { goBack } = navigation;

  try {
    const { data }: AxiosResponse<DonateModuleTypes.IDonate> = yield Donates.updateMyDonate(
      id,
      donate,
    );

    const donates: DonateModuleTypes.IDonate[] = yield select(
      ({ myDonates }: AppState) => myDonates.data,
    );
    const updatedDonates = donates.map((item) => (item.id === data.id ? data : item));

    yield put(updateMyDonateSuccess(updatedDonates));
    goBack();
  } catch (e) {
    yield put(updateMyDonateFailure(formatError(e, true)));
  }
}

function* closeMyDonate(action): any {
  const { payload }: { payload: IDispatchCloseMyDonate } = action;
  const { id } = payload;

  try {
    yield Donates.closeMyDonate(id);

    const donates: DonateModuleTypes.IDonate[] = yield select(
      ({ myDonates }: AppState) => myDonates.data,
    );
    const updatedDonates = donates.filter((item) => item.id !== id);

    yield put(closeMyDonateSuccess(updatedDonates));
  } catch (e) {
    yield put(closeMyDonateFailure(formatError(e, true)));
  }
}

export default mapWatcherTreeToSaga({
  [MyDonatesActionTypes.FETCH_MY_DONATES_REQUEST]: fetchMyDonates,
  [MyDonatesActionTypes.UPDATE_MY_DONATE_REQUEST]: updateMyDonate,
  [MyDonatesActionTypes.CLOSE_MY_DONATE_REQUEST]: closeMyDonate,
});
