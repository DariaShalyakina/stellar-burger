// Импорт необходимых функций из Redux Toolkit и других модулей
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

// Интерфейс для состояния
interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: null | string;
}

// Начальное состояние
const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

// Thunk для получения данных о заказах
export const getFeeds = createAsyncThunk('feed/getFeeds', async () =>
  getFeedsApi()
);

// Slice состояния данных о заказах
const feedSlice = createSlice({
  name: 'feed', // Название среза
  initialState, // Использование начального состояния
  reducers: {}, // Редукторы (в данном случае отсутствуют)
  selectors: {
    // Селекторы для получения частей состояния (заказов, общего количества заказов, заказов за сегодня)
    getOrdersFeeds: (state) => state.orders,
    getTotalFeeds: (state) => state.total,
    getTotalTodayFeeds: (state) => state.totalToday
  },
  // Обработчики дополнительных событий (загрузка, ошибки, успешное получение данных)
  extraReducers: (builder) => {
    builder
      // При начале загрузки устанавливается флаг загрузки и сбрасывается ошибка
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // При возникновении ошибки сбрасывается флаг загрузки и устанавливается ошибка
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      // При успешном получении данных сбрасывается ошибка, флаг загрузки и обновляются данные о заказах
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const feedReducer = feedSlice.reducer;
export const { getOrdersFeeds, getTotalFeeds, getTotalTodayFeeds } =
  feedSlice.selectors;
