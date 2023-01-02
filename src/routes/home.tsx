import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { HomeScreen, Login } from 'src/components/pages';
import { HomeRoutes } from 'src/constants/routes';
import { useAppSelector } from 'src/redux';
import { UserType } from 'src/redux/modules/auth/types';
import { RootReducer } from 'src/redux/modules/types';

const getRoutes = (type: UserType) => {
  if (type === 'SUPER_ADMIN') {
    return <Route path="/*" element={<Navigate to={HomeRoutes.superAdmin.route} replace />} />;
  } else if (type === 'NORMAL') {
    return <Route path="/*" element={<Navigate to={HomeRoutes.user.route} replace />} />;
  } else {
    return <Route path="/*" element={<Navigate to={HomeRoutes.homeScreen.route} replace />} />;
  }
};

const Home = (): JSX.Element => {
  const token = sessionStorage.getItem('token');
  const { authenticated } = useAppSelector((state: RootReducer) => state.auth);

  return (
    <Routes>
      {!token && <Route path={HomeRoutes.login.route} element={<Login />} />}
      <Route path={HomeRoutes.homeScreen.route} element={<HomeScreen />} />
      {getRoutes(authenticated.userType)}
    </Routes>
  );
};

export default Home;
