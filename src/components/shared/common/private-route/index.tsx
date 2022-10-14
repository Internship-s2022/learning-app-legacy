import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { RootReducer } from 'src/redux/modules/types';

import { PrivateRouteProps } from './types';

const PrivateRoute = ({
  role = ['NORMAL'],
  redirectPath = '/login',
  children,
}: PrivateRouteProps): JSX.Element => {
  const { authenticated, error } = useSelector((state: RootReducer) => state.auth);

  if (!role.includes(authenticated?.userType) || error) {
    return <Navigate to={redirectPath} />;
  }
  return children ? children : <Outlet />;
};

export default PrivateRoute;
