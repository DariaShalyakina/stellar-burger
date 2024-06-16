import {
  burgerConstructorReducer,
  initialState,
  addItem,
  clearItems,
  removeItem,
  moveItemUp,
  moveItemDown,
  TBurgerConstructorState
} from '../burgerConstructor';

describe('Тесты для burgerConstructorReducer', () => {
  let testState: TBurgerConstructorState;

  beforeEach(() => {
    testState = {
      items: {
        bun: null,
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa093f',
            name: 'Мясо бессмертных моллюсков Protostomia',
            type: 'main',
            proteins: 433,
            fat: 244,
            carbohydrates: 33,
            calories: 420,
            price: 1337,
            image: 'https://code.s3.yandex.net/react/code/meat-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-02-large.png',
            id: '1'
          },
          {
            _id: '643d69a5c3f7b9001cfa0944',
            name: 'Соус традиционный галактический',
            type: 'sauce',
            proteins: 42,
            fat: 24,
            carbohydrates: 42,
            calories: 99,
            price: 15,
            image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-03-large.png',
            id: '2'
          }
        ]
      },
      isLoading: false,
      error: null
    };
  });

  test('добавление ингредиента', () => {
    const newIngredient = {
      _id: '643d69a5c3f7b9001cfa0945',
      name: 'Сыр из далёкого космоса',
      type: 'cheese',
      proteins: 20,
      fat: 30,
      carbohydrates: 10,
      calories: 250,
      price: 50,
      image: 'https://code.s3.yandex.net/react/code/cheese-04.png',
      image_mobile:
        'https://code.s3.yandex.net/react/code/cheese-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/cheese-04-large.png',
      id: '3'
    };
    const action = addItem(newIngredient);
    const state = burgerConstructorReducer(testState, action);
    expect(state.items.ingredients.length).toBe(3);
  });

  test('удаление ингредиента', () => {
    const action = removeItem('1');
    const state = burgerConstructorReducer(testState, action);
    expect(state.items.ingredients.length).toBe(1);
  });

  test('очистка ингредиентов', () => {
    const action = clearItems();
    const state = burgerConstructorReducer(testState, action);
    expect(state.items.ingredients.length).toBe(0);
    expect(state.items.bun).toBeNull();
  });

  test('перемещение ингредиента вверх', () => {
    const action = moveItemUp(1);
    const state = burgerConstructorReducer(testState, action);
    expect(state.items.ingredients[0].id).toBe('2');
    expect(state.items.ingredients[1].id).toBe('1');
  });

  test('перемещение ингредиента вниз', () => {
    const action = moveItemDown(0);
    const state = burgerConstructorReducer(testState, action);
    expect(state.items.ingredients[0].id).toBe('2');
    expect(state.items.ingredients[1].id).toBe('1');
  });
});
