import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  removeItem,
  moveItemUp,
  moveItemDown
} from '../../services/slices/burgerConstructor';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    // Обработчик перемещения элемента вниз
    const handleMoveDown = () => {
      dispatch(moveItemDown(index));
    };

    // Обработчик перемещения элемента вверх
    const handleMoveUp = () => {
      dispatch(moveItemUp(index));
    };

    // Обработчик удаления элемента
    const handleClose = () => {
      dispatch(removeItem(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
