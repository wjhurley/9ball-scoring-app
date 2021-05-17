import { Action, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { ThunkAction } from 'redux-thunk';

import rootReducer, { RootState as ReducerRootState } from './rootReducer';

const persistConfig: PersistConfig<ReducerRootState> = {
  key: 'root',
  stateReconciler: autoMergeLevel2,
  storage: storage,
};

const persistedReducer = persistReducer<ReducerRootState>(persistConfig, rootReducer);

const store = configureStore({
  devTools: true,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST'],
    },
  }),
  reducer: persistedReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const persistedStore = persistStore(store);

export default store;
