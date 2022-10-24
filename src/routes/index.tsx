import React, { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// import PrivateRoute from 'src/components/shared/common/private-route';
import { Preloader } from 'src/components/shared/ui';
import { HomeRoutes, SuperAdminRoutes } from 'src/constants/routes';
import { tokenListener } from 'src/utils/token-listener';

const Home = lazy(() => import('./home'));
const SuperAdmin = lazy(() => import('./super-admin'));
const PrivateRoute = lazy(() => import('src/components/shared/common/private-route'));

const AppRoutes = (): JSX.Element => {
  useEffect(() => {
    tokenListener();
  }, []);
  return (
    <Suspense fallback={<Preloader />}>
      <Routes>
        <Route path={HomeRoutes.main.route} element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path={SuperAdminRoutes.main.route} element={<SuperAdmin />} />
        </Route>
        <Route path="/*" element={<Navigate to={HomeRoutes.main.route} />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
