import { combineReducers } from '@reduxjs/toolkit';

import userSliceReducer from '../reducers/userSlice';

const rootReducer = combineReducers({
  user: userSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
