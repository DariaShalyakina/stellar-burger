import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerApi } from '../../utils/burger-api';

type TUserOrderState = {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TUserOrderState = {
  order: null,
  isLoading: false,
  error: null
};

// thunk для отправки заказа на сервер
export const postOrder = createAsyncThunk(
  'order/postOrder',
  async (data: string[]) => orderBurgerApi(data)
);

// slice состояния для управления состоянием заказа пользователя
export const userOrderSlice = createSlice({
  name: 'userOrder',
  initialState: initialState,
  selectors: {
    // селекторы для получения информации о заказе и загрузки
    userOrderSelector: (state) => state.order,
    userOrderLoadingSelector: (state) => state.isLoading
  },
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.isLoading = false;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  }
});
export const { userOrderSelector, userOrderLoadingSelector } =
  userOrderSlice.selectors;
export const { clearOrder } = userOrderSlice.actions;

export const userOrderReducer = userOrderSlice.reducer;
