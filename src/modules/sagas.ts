import { all } from '@redux-saga/core/effects';

import auth from './auth/sagas';
import myRequest from './myRequest/sagas';
import myRequests from './myRequests/sagas';
import user from './user/sagas';
import userMap from './userMap/sagas';
import volunteerMap from './volunteerMap/sagas';
import volunteerRequests from './volunteerRequests/sagas';

export default function* rootSaga(): any {
  yield all([
    auth(),
    myRequest(),
    myRequests(),
    user(),
    userMap(),
    volunteerMap(),
    volunteerRequests(),
  ]);
}
