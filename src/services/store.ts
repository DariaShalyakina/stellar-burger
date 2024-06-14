import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { userReducer } from '../services/slices/user';
import { burgerConstructorReducer } from './slices/burgerConstructor';
import { ingredientsReducer } from './slices/ingredients';
import { feedReducer } from './slices/feed';
import { ordersReducer } from './slices/orders';
import { userOrderReducer } from './slices/order';

// один корневой редьюсер
export const rootReducer = combineReducers({
  user: userReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsReducer,
  feed: feedReducer,
  orders: ordersReducer,
  userOrder: userOrderReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
