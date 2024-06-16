import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

// Определение типа состояния
export type TBurgerConstructorState = {
  items: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  isLoading: boolean;
  error: string | null;
};

// Начальное состояние
export const initialState: TBurgerConstructorState = {
  items: {
    bun: null,
    ingredients: []
  },
  isLoading: false,
  error: null
};

// slice состояния для конструктора
export const burgerConstructor = createSlice({
  name: 'burgerConstructor',
  initialState: initialState,
  selectors: {
    constructorState: (state) => state.items
  },
  reducers: {
    // Действие для установки элементов бургера
    setItems: (
      state,
      action: PayloadAction<TBurgerConstructorState['items']>
    ) => {
      state.items = action.payload; // Устанавливаем новые элементы бургера
    },

    // Действие для добавления ингредиента в бургер
    addItem: (state, action: PayloadAction<TConstructorIngredient>) => {
      const newItem = action.payload; // Новый ингредиент
      if (newItem.type === 'bun') {
        state.items.bun = newItem; // Если тип - булочка, устанавливаем булочку
      } else {
        const newIngredient = { ...newItem, id: nanoid() }; // Генерируем ID для ингредиента
        state.items.ingredients.push(newIngredient); // Добавляем ингредиент в массив
      }
    },

    // Действие для удаления ингредиента из бургера
    removeItem: (state, action: PayloadAction<string>) => {
      const idToRemove = action.payload; // ID ингредиента для удаления
      state.items.ingredients = state.items.ingredients.filter(
        (item) => item.id !== idToRemove // Фильтруем ингредиенты, оставляя только те, у которых ID не совпадает с удаляемым
      );
    },

    // Действие для перемещения ингредиента вверх в списке бургера
    moveItemUp: (state, action: PayloadAction<number>) => {
      const index = action.payload; // Индекс перемещаемого ингредиента
      if (index > 0 && index < state.items.ingredients.length) {
        const itemToMove = state.items.ingredients[index]; // Ингредиент, который нужно переместить
        state.items.ingredients.splice(index, 1); // Удаляем его из текущей позиции
        state.items.ingredients.splice(index - 1, 0, itemToMove); // Вставляем на одну позицию выше
      }
    },

    // Действие для перемещения ингредиента вниз в списке бургера
    moveItemDown: (state, action: PayloadAction<number>) => {
      const index = action.payload; // Индекс перемещаемого ингредиента
      if (index >= 0 && index < state.items.ingredients.length - 1) {
        const itemToMove = state.items.ingredients[index]; // Ингредиент, который нужно переместить
        state.items.ingredients.splice(index, 1); // Удаляем его из текущей позиции
        state.items.ingredients.splice(index + 1, 0, itemToMove); // Вставляем на одну позицию ниже
      }
    },

    // Действие для очистки всех элементов бургера
    clearItems: (state) => {
      state.items.bun = null; // Сбрасываем булочку
      state.items.ingredients = []; // Очищаем массив ингредиентов
    }
  }
});

// Экспорт действий и редюсера из slice конструктора бургера
export const {
  setItems,
  addItem,
  removeItem,
  moveItemUp,
  moveItemDown,
  clearItems
} = burgerConstructor.actions;

export const { constructorState } = burgerConstructor.selectors;
export const burgerConstructorReducer = burgerConstructor.reducer;
