import { NavigationInjectedProps } from 'react-navigation';
import { getSecureValue, removeSecureValue, setSecureValue } from '@boot/keychain';
import { mapWatcherTreeToSaga } from '@boot/redux/saga';
import { ACCESS_TOKEN, REFRESH_TOKEN, resetStackAction } from '@constants';
import { updateUserInfoSuccess } from '@modules/user';
import { Auth } from '@services';
import { formatError } from '@utils';
import { AxiosResponse } from 'axios';
import { put } from 'redux-saga/effects';

import { signInFailure, signInSuccess, signOutFailure, signOutSuccess } from './actions';
import { AuthActionTypes, IAuthorizeResponse, IDispatchAuthorize } from './types';

function* signIn(action): any {
  const { payload }: { payload: IDispatchAuthorize } = action;
  const { navigation } = payload;

  try {
    const { data }: AxiosResponse<IAuthorizeResponse> = yield Auth.signIn(payload);
    const { tokens, user } = data;
    const { accessToken, refreshToken } = tokens;

    yield setSecureValue(ACCESS_TOKEN, accessToken);
    yield setSecureValue(REFRESH_TOKEN, refreshToken);

    yield put(updateUserInfoSuccess(user));
    yield put(signInSuccess());

    if (!user.name) {
      navigation.navigate('EnterName');
      return;
    }

    navigation.dispatch(resetStackAction);
  } catch (e) {
    yield put(signInFailure(formatError(e, true)));
  }
}

function* signOut(action): any {
  const { payload }: { payload: NavigationInjectedProps } = action;
  const { navigation } = payload;

  try {
    const refreshToken = yield getSecureValue(REFRESH_TOKEN);

    yield Auth.signOut(refreshToken);

    yield removeSecureValue(ACCESS_TOKEN);
    yield removeSecureValue(REFRESH_TOKEN);

    yield put(signOutSuccess());
    navigation.dispatch(resetStackAction);
  } catch (e) {
    yield put(signOutFailure(formatError(e, true)));
  }
}

export default mapWatcherTreeToSaga({
  [AuthActionTypes.SIGN_IN_REQUEST]: signIn,
  [AuthActionTypes.SIGN_OUT_REQUEST]: signOut,
});
