import { feedReducer, getFeeds, initialState } from '../feed';

// Пример заказа
const sampleOrder = {
  _id: '66688c9597ede0001d070102',
  ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093d'],
  status: 'done',
  name: 'Флюоресцентный люминесцентный бургер',
  createdAt: '2024-06-11T17:42:45.253Z',
  updatedAt: '2024-06-11T17:42:45.723Z',
  number: 42148
};

describe('Тесты для feedReducer', () => {
  test('Проверка состояния при запросе данных', () => {
    const action = { type: getFeeds.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Проверка состояния при успешном получении данных', () => {
    const action = {
      type: getFeeds.fulfilled.type,
      payload: {
        orders: [sampleOrder],
        total: 1,
        totalToday: 1
      }
    };
    const state = feedReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual([sampleOrder]);
    expect(state.total).toBe(1);
    expect(state.totalToday).toBe(1);
  });

  test('Проверка состояния при ошибке получения данных', () => {
    const error = 'Ошибка получения данных';
    const action = {
      type: getFeeds.rejected.type,
      error: { message: error }
    };
    const state = feedReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });
});
