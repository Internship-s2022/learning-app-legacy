import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/layout';
import { Preloader } from './components/shared/ui';
import AppRoutes from './constants/routes';

const Home = lazy(() => import('./components/pages/home'));
const Login = lazy(() => import('./components/pages/login'));
const Storybook = lazy(() => import('./components/pages/storybook'));

const App = (): JSX.Element => {
  return (
    <Suspense fallback={<Preloader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={AppRoutes.home.route} element={<Home />} />
          <Route path={AppRoutes.login.route} element={<Login />} />
          <Route path={AppRoutes.storybook.route} element={<Storybook />} />
          <Route path={AppRoutes.default.route} element={<Navigate to={AppRoutes.home.route} />} />
          <Route path="*" element={<Navigate to={AppRoutes.home.route} />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
