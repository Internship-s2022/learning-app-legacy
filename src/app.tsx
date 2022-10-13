import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/layout';
import PrivatePage from './components/pages/private-page';
import ProtectedRoute from './components/shared/common/private-route';
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
          <Route
            path={AppRoutes.PROTECTED}
            element={
              <ProtectedRoute role="NORMAL">
                <PrivatePage />
              </ProtectedRoute>
            }
          />
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
