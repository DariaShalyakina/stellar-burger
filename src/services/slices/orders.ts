import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';

interface TOrdersState {
  orders: Array<TOrder>;
  isLoading: boolean;
  error: null | string;
}

const initialState: TOrdersState = {
  orders: [],
  isLoading: false,
  error: null
};

// thunk для получения заказов пользователя
export const getUserOrders = createAsyncThunk(
  'orders/ordersUser',
  getOrdersApi
);

// slice состояния для управления состоянием заказов
export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    orderSelector: (state) => state.orders
  },
  extraReducers: (build) => {
    build
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.error = null;
        state.orders = action.payload;
        state.isLoading = false;
      });
  }
});

export const ordersReducer = orderSlice.reducer;
export const { orderSelector } = orderSlice.selectors;
