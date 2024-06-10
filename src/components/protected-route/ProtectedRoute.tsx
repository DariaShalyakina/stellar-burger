import React from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { selectAuthChecked, selectUserData } from '../../services/slices/user';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector((state) => selectAuthChecked(state));
  const location = useLocation();
  const fromPage = location.state?.from || { pathname: '/' };

  const user = useSelector(selectUserData);
  const locationState = location.state as { background?: Location };
  const background = locationState && locationState.background;

  if (!isAuthChecked && !onlyUnAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthChecked) {
    return <Navigate replace to={fromPage} />;
  }

  return children;
};
