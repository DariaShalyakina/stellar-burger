import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectUserData } from '../../services/slices/user';

// Получение данных о пользователе из Redux хранилища
export const AppHeader: FC = () => {
  const user = useSelector(selectUserData);

  return <AppHeaderUI userName={user?.name} />; /// Возвращаем интерфейс для заголовка с именем пользователя
};
