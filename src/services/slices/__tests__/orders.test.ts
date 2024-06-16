import { orderSlice, getUserOrders } from '../orders';

describe('Тестирование редьюсера заказов', () => {
  // Предполагаемые данные для успешного запроса
  const orders = [
    {
      _id: '66688c9597ede0001d070102',
      ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093d'],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-06-11T17:42:45.253Z',
      updatedAt: '2024-06-11T17:42:45.723Z',
      number: 42148
    }
  ];

  // Mock функция для getOrdersApi
  const mockGetOrdersApi = jest.fn(() => Promise.resolve(orders));

  test('Обработка успешного получения заказов', () => {
    // Создаем экшен для успешного получения заказов
    const action = {
      type: getUserOrders.fulfilled.type,
      payload: orders
    };

    // Применяем экшен к редьюсеру
    const state = orderSlice.reducer(orderSlice.getInitialState(), action);

    // Проверяем, что состояние обновлено правильно
    expect(state.orders).toEqual(orders);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  test('Обработка ошибки при получении заказов', () => {
    // Создаем экшен для ошибки при получении заказов
    const error = 'Ошибка при загрузке заказов';
    const action = {
      type: getUserOrders.rejected.type,
      error: { message: error }
    };

    // Применяем экшен к редьюсеру
    const state = orderSlice.reducer(orderSlice.getInitialState(), action);

    // Проверяем, что состояние обновлено правильно
    expect(state.orders).toEqual([]);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });

  test('Обработка запроса на получение заказов', () => {
    // Создаем экшен для запроса на получение заказов
    const action = { type: getUserOrders.pending.type };

    // Применяем экшен к редьюсеру
    const state = orderSlice.reducer(orderSlice.getInitialState(), action);

    // Проверяем, что состояние обновлено правильно
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });
});
