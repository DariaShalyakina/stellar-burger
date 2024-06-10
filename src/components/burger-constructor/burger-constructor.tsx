import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { selectAuthChecked } from '../../services/slices/user';
import {
  userOrderSelector,
  clearOrder,
  postOrder,
  userOrderLoadingSelector
} from '../../services/slices/order';
import {
  clearItems,
  constructorState
} from '../../services/slices/burgerConstructor';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(constructorState); // Получение текущего состояния конструктора бургера
  const orderRequest = useSelector(userOrderLoadingSelector); // Получение состояния загрузки заказа
  const orderModalData = useSelector(userOrderSelector); // Получение данных о заказе
  const isAuthChecked = useSelector(selectAuthChecked); // Получение состояния проверки аутентификации пользователя

  // Обработчик нажатия кнопки заказа
  const onOrderClick = () => {
    if (!isAuthChecked) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    const order = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(({ _id }) => _id),
      constructorItems.bun._id
    ];
    dispatch(postOrder(order));
  };

  // Закрытие модального окна заказа
  const closeOrderModal = () => {
    navigate('/');
    dispatch(clearItems());
    dispatch(clearOrder());
  };

  // Вычисление общей цены конструктора бургера с учетом выбранных ингредиентов
  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
