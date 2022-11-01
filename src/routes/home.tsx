import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from 'src/components/layout';
import { Login } from 'src/components/pages';
import { HomeRoutes } from 'src/constants/routes';

import Landing from '../components/pages/landing';

const Home = (): JSX.Element => {
  const token = sessionStorage.getItem('token');

  return (
    <Routes>
      {!token && <Route path={HomeRoutes.login.route} element={<Login />} />}
      <Route element={<Layout routes={HomeRoutes} />}>
        <Route path={HomeRoutes.home.route} element={<Landing />} />
        <Route path="/*" element={<Navigate to={HomeRoutes.home.route} />} />
      </Route>
    </Routes>
  );
};

export default Home;
