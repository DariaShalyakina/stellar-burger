import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { RootState } from '../../services/store';

export type TUserState = {
  authChecked: boolean;
  isLoading: boolean;
  user: TUser | null;
  userError: string | null;
};

// Определение начального состояния
export const initialState: TUserState = {
  authChecked: false,
  isLoading: false,
  user: null,
  userError: null
};

//вызов регистрации пользователя
export const registerUser = createAsyncThunk(
  'users/register',
  async (data: TRegisterData) =>
    registerUserApi(data).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    })
);

//вызов входа пользователя
export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) =>
    loginUserApi(data).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    })
);

//вызов получения пользователя
export const getUser = createAsyncThunk('user/getUser', getUserApi);

//вызов обновления пользователя
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

//вызов выхода пользователя
export const logoutUser = createAsyncThunk('user/logout', async () =>
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  })
);

// Слайс пользователя
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.userError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.authChecked = false;
        state.userError = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoading = false;
        state.authChecked = true;
        state.userError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.authChecked = false;
        state.userError = action.error.message as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.authChecked = false;
        state.isLoading = true;
        state.userError = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoading = false;
        state.authChecked = true;
        state.userError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.authChecked = false;
        state.userError = action.error.message as string;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.userError = null;
        state.authChecked = false;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isLoading = false;
        state.authChecked = true;
        state.userError = null;
      })
      .addCase(getUser.rejected, (state, { error }) => {
        state.isLoading = false;
        state.userError = error.message as string;
        state.authChecked = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.userError = null;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isLoading = false;
        state.userError = null;
        state.authChecked = true;
      })
      .addCase(updateUser.rejected, (state, { error }) => {
        state.isLoading = false;
        state.userError = error.message as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.authChecked = true;
        state.userError = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
        state.authChecked = false;
        state.userError = null;
      })
      .addCase(logoutUser.rejected, (state, { error }) => {
        state.isLoading = false;
        state.authChecked = false;
        state.userError = error.message as string;
      });
  }
});

export const userReducer = userSlice.reducer;
export const { clearError } = userSlice.actions;

export const selectUserData = (state: RootState) => state.user.user;
export const selectAuthChecked = (state: RootState) => state.user.authChecked;
export const selectLoadingUserInfo = (state: RootState) => state.user.isLoading;
