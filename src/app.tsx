import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/layout';
import AppRoutes from './constants/routes';

const Home = lazy(() => import('./components/pages/home'));
const Login = lazy(() => import('./components/pages/login'));

const App = (): JSX.Element => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={AppRoutes.HOME} element={<Home />} />
          <Route path={AppRoutes.LOGIN} element={<Login />} />
          <Route path={AppRoutes.DEFAULT} element={<Navigate to={AppRoutes.HOME} />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
