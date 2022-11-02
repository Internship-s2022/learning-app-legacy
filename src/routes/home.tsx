import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from 'src/components/layout';
import { Login } from 'src/components/pages';
import { HomeRoutes } from 'src/constants/routes';
import { RootReducer } from 'src/redux/modules/types';

import Landing from '../components/pages/landing';

const Home = (): JSX.Element => {
  const token = sessionStorage.getItem('token');
  const { authenticated } = useSelector((state: RootReducer) => state.auth);

  return (
    <Routes>
      {!token && <Route path={HomeRoutes.login.route} element={<Login />} />}
      <Route element={<Layout routes={HomeRoutes} />}>
        <Route path={HomeRoutes.home.route} element={<Landing />} />
        {authenticated?.userType === 'SUPER_ADMIN' ? (
          <Route path="/*" element={<Navigate to={HomeRoutes.superAdmin.route} replace />} />
        ) : (
          <Route path="/*" element={<Navigate to={HomeRoutes.home.route} replace />} />
        )}
      </Route>
    </Routes>
  );
};

export default Home;
