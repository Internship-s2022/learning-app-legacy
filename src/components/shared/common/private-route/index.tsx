import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { RootReducer } from 'src/redux/modules/types';

import { Preloader } from '../../ui';
import { PrivateRouteProps } from './types';

const PrivateRoute = ({
  role = ['SUPER_ADMIN'],
  redirectPath = '/login',
  children,
}: PrivateRouteProps): JSX.Element => {
  const isLoading = sessionStorage.getItem('isLoading');
  const { authenticated, errorData } = useSelector((state: RootReducer) => state.auth);

  if (isLoading === 'true') {
    return <Preloader />;
  }
  if (!role.includes(authenticated?.userType) || errorData.error) {
    return <Navigate to={redirectPath} />;
  }
  return children ? children : <Outlet />;
};

export default PrivateRoute;
