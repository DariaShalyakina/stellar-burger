import { userOrderSlice, postOrder } from '../order';

describe('Тестирование редьюсера заказа пользователя', () => {
  // Предполагаемые данные для успешного запроса
  const order = {
    _id: '666b2c5497ede0001d0706fe',
    ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093d'],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-06-13T17:28:52.942Z',
    updatedAt: '2024-06-13T17:28:53.314Z',
    number: 42302
  };

  // Mock функция для orderBurgerApi
  const mockOrderBurgerApi = jest.fn(() => Promise.resolve({ order }));

  test('Обработка успешного заказа', () => {
    // Создаем экшен для успешного заказа
    const action = {
      type: postOrder.fulfilled.type,
      payload: { order }
    };

    // Применяем экшен к редьюсеру
    const state = userOrderSlice.reducer(
      userOrderSlice.getInitialState(),
      action
    );

    // Проверяем, что состояние обновлено правильно
    expect(state.order).toEqual(order);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  test('Обработка ошибки при заказе', () => {
    const error = 'Ошибка при заказе';

    // Создаем экшен для ошибки при заказе
    const action = {
      type: postOrder.rejected.type,
      error: { message: error }
    };

    // Применяем экшен к редьюсеру
    const state = userOrderSlice.reducer(
      userOrderSlice.getInitialState(),
      action
    );

    // Проверяем, что состояние обновлено правильно
    expect(state.order).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });

  test('Обработка запроса на заказ', () => {
    // Создаем экшен для запроса на заказ
    const action = { type: postOrder.pending.type };

    // Применяем экшен к редьюсеру
    const state = userOrderSlice.reducer(
      userOrderSlice.getInitialState(),
      action
    );

    // Проверяем, что состояние обновлено правильно
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });
});
