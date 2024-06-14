import {
  userReducer,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logoutUser,
  initialState
} from '../user';

// Пример данных пользователя для успешного получения информации о пользователе
const sampleUser = {
  email: 'tormozovadaria@yandex.ru',
  name: 'dari',
  success: true
};

// Данные для регистрации пользователя
const registerUserData = {
  email: 'tormozovadaria@yandex.ru',
  name: 'dari',
  password: '1234567'
};

// Данные для входа пользователя
const loginUserData = {
  email: 'tormozovadaria@yandex.ru',
  password: '1234567'
};

describe('Тесты для userReducer', () => {
  test('Проверка состояния при регистрации пользователя', () => {
    const action = { type: registerUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.authChecked).toBe(false);
    expect(state.userError).toBeNull();
  });

  test('Проверка состояния при успешной регистрации пользователя', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: registerUserData
    };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.authChecked).toBe(true);
    expect(state.userError).toBeNull();
    expect(state.user).toEqual(registerUserData);
  });

  test('Проверка состояния при запросе информации о пользователе', () => {
    const action = { type: getUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.authChecked).toBe(false);
    expect(state.userError).toBeNull();
  });

  test('Проверка состояния при успешном получении информации о пользователе', () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: { user: sampleUser }
    };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.authChecked).toBe(true);
    expect(state.userError).toBeNull();
    expect(state.user).toEqual(sampleUser);
  });

  test('Проверка состояния при успешном входе пользователя', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: loginUserData
    };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.authChecked).toBe(true);
    expect(state.userError).toBeNull();
    expect(state.user).toEqual(loginUserData);
  });

  test('Проверка состояния при обновлении информации о пользователе', () => {
    const action = { type: updateUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.authChecked).toBe(false);
    expect(state.userError).toBeNull();
  });

  test('Проверка состояния при успешном обновлении информации о пользователе', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: sampleUser }
    };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.authChecked).toBe(true);
    expect(state.userError).toBeNull();
    expect(state.user).toEqual(sampleUser);
  });

  test('Проверка состояния при выходе пользователя', () => {
    const action = { type: logoutUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.authChecked).toBe(true);
    expect(state.userError).toBeNull();
  });

  test('Проверка состояния при успешном выходе пользователя', () => {
    const action = {
      type: logoutUser.fulfilled.type,
      payload: undefined
    };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.authChecked).toBe(false);
    expect(state.userError).toBeNull();
    expect(state.user).toBeNull();
  });
});
