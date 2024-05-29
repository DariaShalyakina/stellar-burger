import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getIngredientsSelector } from '../../services/slices/ingredients';

export const IngredientDetails: FC = () => {
  const { id } = useParams(); // Получение параметра id
  const ingredients = useSelector(getIngredientsSelector); // Получение списка ингредиентов
  const ingredientData = ingredients.find((i) => i._id === id); // Поиск данных конкретного ингредиента по его id

  // Отображение прелодера при загрузке данных
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
