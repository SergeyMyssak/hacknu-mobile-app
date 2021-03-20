import { NavigationActions, StackActions } from 'react-navigation';
import { mapWatcherTreeToSaga } from '@boot/redux/saga';
import { Requests } from '@services';
import { RequestModuleTypes } from '@types';
import { formatError } from '@utils';
import { AxiosResponse } from 'axios';
import { put } from 'redux-saga/effects';

import { sendMyRequestFailure, sendMyRequestSuccess } from './actions';
import { IDispatchSendMyRequest, MyRequestActionTypes } from './types';

function* sendRequest(action): any {
  const { payload }: { payload: IDispatchSendMyRequest } = action;
  const { navigation, resetForm, ...request } = payload;
  const { dispatch } = navigation;

  try {
    const { data }: AxiosResponse<RequestModuleTypes.IRequest> = yield Requests.sendMyRequest(
      request,
    );

    yield put(sendMyRequestSuccess(data));

    const resetAction = StackActions.reset({
      index: 0,
      key: 'MainStack',
      actions: [NavigationActions.navigate({ routeName: 'Main' })],
    });
    yield dispatch(resetAction);
    resetForm();
  } catch (e) {
    yield put(sendMyRequestFailure(formatError(e, true)));
  }
}

export default mapWatcherTreeToSaga({
  [MyRequestActionTypes.SEND_MY_REQUEST_REQUEST]: sendRequest,
});
