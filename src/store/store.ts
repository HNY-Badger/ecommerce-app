import { combineReducers, configureStore } from '@reduxjs/toolkit';
import addressesReducer from './reducers/RegAddressesSlice';

const rootReducer = combineReducers({
  addressesReducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
