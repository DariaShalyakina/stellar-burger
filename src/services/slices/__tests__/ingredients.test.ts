import {
  ingredientsReducer,
  getIngredients,
  initialState
} from '../ingredients';

// объекты ингредиентов
const ingredient1 = {
  _id: '643d69a5c3f7b9001cfa093f',
  name: 'Мясо бессмертных моллюсков Protostomia',
  type: 'main',
  proteins: 433,
  fat: 244,
  carbohydrates: 33,
  calories: 420,
  price: 1337,
  image: 'https://code.s3.yandex.net/react/code/meat-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
  __v: 0
};

const ingredient2 = {
  _id: '643d69a5c3f7b9001cfa0944',
  name: 'Соус традиционный галактический',
  type: 'sauce',
  proteins: 42,
  fat: 24,
  carbohydrates: 42,
  calories: 99,
  price: 15,
  image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
  __v: 0
};

describe('Тесты для ingredientsReducer', () => {
  test('Проверка состояния при запросе данных', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Проверка состояния при успешном получении данных', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: [ingredient1, ingredient2]
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.ingredients).toEqual([ingredient1, ingredient2]);
  });

  test('Проверка состояния при ошибке получения данных', () => {
    const error = 'Ошибка получения данных';
    const action = {
      type: getIngredients.rejected.type,
      error: { message: error }
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });
});
