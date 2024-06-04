import { combineReducers, configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/NotificationSlice';
import customerReducer from './reducers/CustomerSlice';
import productsReducer from './reducers/ProductsSlice';
import cartReducer from './reducers/CartSlice';

const rootReducer = combineReducers({
  notificationReducer,
  customerReducer,
  productsReducer,
  cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
