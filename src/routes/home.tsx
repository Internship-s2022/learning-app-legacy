import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from 'src/components/layout';
import { Login } from 'src/components/pages';
import { HomeRoutes } from 'src/constants/routes';
import { RootReducer } from 'src/redux/modules/types';

import Landing from '../components/pages/landing';

const Home = (): JSX.Element => {
  const authenticated = useSelector((state: RootReducer) => state.auth.authenticated);

  return (
    <div>
      <Routes>
        <Route
          element={<Layout routes={HomeRoutes} logoutOption={authenticated?.token !== undefined} />}
        >
          <Route path={HomeRoutes.home.route} element={<Landing />} />
          <Route path="/*" element={<Navigate to={HomeRoutes.home.route} />} />
        </Route>
        <Route path={HomeRoutes.login.route} element={<Login />} />
      </Routes>
    </div>
  );
};

export default Home;
