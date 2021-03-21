import { combineReducers } from 'redux';

import { authReducer as auth } from './auth';
import { myDonateReducer as myDonate } from './myDonate';
import { myDonatesReducer as myDonates } from './myDonates';
import { myRequestReducer as myRequest } from './myRequest';
import { myRequestsReducer as myRequests } from './myRequests';
import { persistReducer as persist } from './persist';
import { statusBarReducer as statusBar } from './statusBar';
import { userReducer as user } from './user';
import { userMapReducer as userMap } from './userMap';
import { volunteerDonatesReducer as volunteerDonates } from './volunteerDonates';
import { volunteerMapReducer as volunteerMap } from './volunteerMap';
import { volunteerRequestsReducer as volunteerRequests } from './volunteerRequests';

const rootReducer = combineReducers({
  auth,
  myDonate,
  myDonates,
  myRequest,
  myRequests,
  persist,
  statusBar,
  user,
  userMap,
  volunteerDonates,
  volunteerMap,
  volunteerRequests,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
