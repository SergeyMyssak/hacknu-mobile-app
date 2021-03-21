import { all } from '@redux-saga/core/effects';

import auth from './auth/sagas';
import myDonate from './myDonate/sagas';
import myDonates from './myDonates/sagas';
import myRequest from './myRequest/sagas';
import myRequests from './myRequests/sagas';
import user from './user/sagas';
import userMap from './userMap/sagas';
import volunteerDonates from './volunteerDonates/sagas';
import volunteerMap from './volunteerMap/sagas';
import volunteerRequests from './volunteerRequests/sagas';

export default function* rootSaga(): any {
  yield all([
    auth(),
    myDonate(),
    myDonates(),
    myRequest(),
    myRequests(),
    user(),
    userMap(),
    volunteerDonates(),
    volunteerMap(),
    volunteerRequests(),
  ]);
}
