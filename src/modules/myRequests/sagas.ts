import { mapWatcherTreeToSaga } from '@boot/redux/saga';
import { AppState } from '@modules/reducers';
import { Requests } from '@services';
import { RequestModuleTypes } from '@types';
import { formatError } from '@utils';
import { AxiosResponse } from 'axios';
import { put, select } from 'redux-saga/effects';

import {
  closeMyRequestFailure,
  closeMyRequestSuccess,
  fetchMyRequestsFailure,
  fetchMyRequestsSuccess,
  updateMyRequestFailure,
  updateMyRequestSuccess,
} from './actions';
import { IDispatchCloseMyRequest, IDispatchUpdateMyRequest, MyRequestsActionTypes } from './types';

function* fetchMyRequests(): any {
  try {
    const { data }: AxiosResponse<RequestModuleTypes.IRequest[]> = yield Requests.fetchMyRequests();

    yield put(fetchMyRequestsSuccess(data));
  } catch (e) {
    yield put(fetchMyRequestsFailure(formatError(e, true)));
  }
}

function* updateMyRequest(action): any {
  const { payload }: { payload: IDispatchUpdateMyRequest } = action;
  const { navigation, id, ...request } = payload;
  const { goBack } = navigation;

  try {
    const { data }: AxiosResponse<RequestModuleTypes.IRequest> = yield Requests.updateMyRequest(
      id,
      request,
    );

    const requests: RequestModuleTypes.IRequest[] = yield select(
      ({ myRequests }: AppState) => myRequests.data,
    );
    const updatedRequests = requests.map((item) => (item.id === data.id ? data : item));

    yield put(updateMyRequestSuccess(updatedRequests));
    goBack();
  } catch (e) {
    yield put(updateMyRequestFailure(formatError(e, true)));
  }
}

function* closeMyRequest(action): any {
  const { payload }: { payload: IDispatchCloseMyRequest } = action;
  const { id } = payload;

  try {
    yield Requests.closeMyRequest(id);

    const requests: RequestModuleTypes.IRequest[] = yield select(
      ({ myRequests }: AppState) => myRequests.data,
    );
    const updatedRequests = requests.filter((item) => item.id !== id);

    yield put(closeMyRequestSuccess(updatedRequests));
  } catch (e) {
    yield put(closeMyRequestFailure(formatError(e, true)));
  }
}

export default mapWatcherTreeToSaga({
  [MyRequestsActionTypes.FETCH_MY_REQUESTS_REQUEST]: fetchMyRequests,
  [MyRequestsActionTypes.UPDATE_MY_REQUEST_REQUEST]: updateMyRequest,
  [MyRequestsActionTypes.CLOSE_MY_REQUEST_REQUEST]: closeMyRequest,
});
