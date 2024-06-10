import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';

import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/slices/user';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await dispatch(
        registerUser({
          name: userName,
          email,
          password
        })
      );
      navigate('/login'); // Регистрация прошла успешно, перенаправляем на страницу входа
    } catch (error) {
      setErrorText('Что-то пошло не так'); // В случае ошибки выводим сообщение об ошибке
    }
  };

  return (
    <RegisterUI
      errorText={errorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
