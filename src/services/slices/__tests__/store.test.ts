import { expect, test } from '@jest/globals';
import { rootReducer } from '../../store';
import { ingredientsReducer } from '../ingredients';
import { burgerConstructorReducer } from '../burgerConstructor';
import { feedReducer } from '../feed';
import { userOrderReducer } from '../order';
import { ordersReducer } from '../orders';
import { userReducer } from '../user';

describe('проверяем rootReducer', () => {
  test('тест правильной инициализации rootReducer', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const initialState = rootReducer(undefined, action);

    expect(initialState).toEqual({
      user: userReducer(undefined, action),
      burgerConstructor: burgerConstructorReducer(undefined, action),
      ingredients: ingredientsReducer(undefined, action),
      feed: feedReducer(undefined, action),
      orders: ordersReducer(undefined, action),
      userOrder: userOrderReducer(undefined, action)
    });
  });
});
