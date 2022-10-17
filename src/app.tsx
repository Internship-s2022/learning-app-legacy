import React, { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/layout';
import PrivatePage from './components/pages/private-page';
import PrivateRoute from './components/shared/common/private-route';
import { Preloader } from './components/shared/ui';
import AppRoutes from './constants/routes';
import { tokenListener } from './utils/tokenListener';

const Home = lazy(() => import('./components/pages/home'));
const Login = lazy(() => import('./components/pages/login'));
const Storybook = lazy(() => import('./components/pages/storybook'));

const App = (): JSX.Element => {
  useEffect(() => {
    tokenListener();
  }, []);

  return (
    <Suspense fallback={<Preloader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={AppRoutes.home.route} element={<Home />} />
          <Route element={<PrivateRoute />}>
            <Route path={AppRoutes.auth.route} element={<PrivatePage />} />
          </Route>
          <Route path={AppRoutes.login.route} element={<Login />} />
          <Route path={AppRoutes.storybook.route} element={<Storybook />} />
          <Route path="*" element={<Navigate to={AppRoutes.home.route} />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
