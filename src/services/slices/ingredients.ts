import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../../utils/burger-api';

interface IngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: null | string;
}

export const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

// Thunk для получения ингредиентов
export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => getIngredientsApi()
);

// slice состояния для ингредиентов
export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  selectors: {
    // селекторы для получения состояния загрузки и получения ингредиентов из состояния
    getIngredientsSelector: (state) => state.ingredients,
    getIngredientsLoading: (state) => state.isLoading
  },
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { getIngredientsSelector, getIngredientsLoading } =
  ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;
