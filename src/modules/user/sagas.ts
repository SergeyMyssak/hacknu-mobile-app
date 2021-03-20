import { mapWatcherTreeToSaga } from '@boot/redux/saga';
import { resetStackAction } from '@constants';
import { User } from '@services';
import { formatError } from '@utils';
import { AxiosResponse } from 'axios';
import { put } from 'redux-saga/effects';

import { updateUserInfoFailure, updateUserInfoSuccess } from './actions';
import { IDispatchUpdateUserInfo, IUpdateUserInfoResponse, UserActionTypes } from './types';

function* updateUserInfo(action): any {
  const { payload }: { payload: IDispatchUpdateUserInfo } = action;
  const { name, navigation } = payload;

  try {
    const { data }: AxiosResponse<IUpdateUserInfoResponse> = yield User.updateUserInfo(name);

    yield put(updateUserInfoSuccess(data));

    navigation.dispatch(resetStackAction);
  } catch (e) {
    yield put(updateUserInfoFailure(formatError(e)));
  }
}

export default mapWatcherTreeToSaga({
  [UserActionTypes.UPDATE_USER_INFO_REQUEST]: updateUserInfo,
});
