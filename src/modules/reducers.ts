import { combineReducers } from 'redux';

import { authReducer as auth } from './auth';
import { myRequestReducer as myRequest } from './myRequest';
import { myRequestsReducer as myRequests } from './myRequests';
import { persistReducer as persist } from './persist';
import { statusBarReducer as statusBar } from './statusBar';
import { userReducer as user } from './user';
import { userMapReducer as userMap } from './userMap';
import { volunteerMapReducer as volunteerMap } from './volunteerMap';
import { volunteerRequestsReducer as volunteerRequests } from './volunteerRequests';

const rootReducer = combineReducers({
  auth,
  myRequest,
  myRequests,
  persist,
  statusBar,
  user,
  userMap,
  volunteerMap,
  volunteerRequests,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
