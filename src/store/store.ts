import { combineReducers, configureStore } from '@reduxjs/toolkit';
import addressesReducer from './reducers/RegAddressesSlice';

const rootReducer = combineReducers({
  addressesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
