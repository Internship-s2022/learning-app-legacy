import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from 'src/components/layout';
import { Login } from 'src/components/pages';
import { HomeRoutes } from 'src/constants/routes';
import { useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';

const Home = (): JSX.Element => {
  const token = sessionStorage.getItem('token');
  const { authenticated } = useAppSelector((state: RootReducer) => state.auth);

  const getRoutes = () => {
    if (authenticated?.userType === 'SUPER_ADMIN') {
      return <Route path="/*" element={<Navigate to={HomeRoutes.superAdmin.route} replace />} />;
    } else if (authenticated?.userType === 'NORMAL') {
      return <Route path="/*" element={<Navigate to={HomeRoutes.admin.route} replace />} />;
    } else return <Route path="/*" element={<Navigate to={HomeRoutes.home.route} replace />} />;
  };

  return (
    <Routes>
      {!token && <Route path={HomeRoutes.login.route} element={<Login />} />}
      <Route element={<Layout headerRoutes={HomeRoutes} />}>
        <Route path={HomeRoutes.homeUser.route} element={<div>Landing</div>} />
        {getRoutes()}
      </Route>
    </Routes>
  );
};

export default Home;
