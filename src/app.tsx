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
          <Route path={AppRoutes.HOME} element={<Home />} />
          <Route path={AppRoutes.LOGIN} element={<Login />} />
          <Route path={AppRoutes.STORYBOOK} element={<Storybook />} />
          <Route path={AppRoutes.DEFAULT} element={<Navigate to={AppRoutes.HOME} />} />
          <Route path="*" element={<Navigate to={AppRoutes.HOME} />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
