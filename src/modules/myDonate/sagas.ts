import { NavigationActions, StackActions } from 'react-navigation';
import { mapWatcherTreeToSaga } from '@boot/redux/saga';
import { Donates } from '@services';
import { DonateModuleTypes } from '@types';
import { formatError } from '@utils';
import { AxiosResponse } from 'axios';
import { put } from 'redux-saga/effects';

import { sendMyDonateFailure, sendMyDonateSuccess } from './actions';
import { IDispatchSendMyDonate, MyDonateActionTypes } from './types';

function* sendDonate(action): any {
  const { payload }: { payload: IDispatchSendMyDonate } = action;
  const { navigation, resetForm, ...donate } = payload;
  const { dispatch } = navigation;

  try {
    const { data }: AxiosResponse<DonateModuleTypes.IDonate> = yield Donates.sendMyDonate(donate);

    yield put(sendMyDonateSuccess(data));

    const resetAction = StackActions.reset({
      index: 0,
      key: 'MainStack',
      actions: [NavigationActions.navigate({ routeName: 'Main' })],
    });
    yield dispatch(resetAction);
    resetForm();
  } catch (e) {
    yield put(sendMyDonateFailure(formatError(e, true)));
  }
}

export default mapWatcherTreeToSaga({
  [MyDonateActionTypes.SEND_MY_DONATE_REQUEST]: sendDonate,
});
