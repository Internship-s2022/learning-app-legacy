import React, { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { Preloader } from 'src/components/shared/ui';
import { HomeRoutes, SuperAdminRoutes, UserRoutes } from 'src/constants/routes';
import { tokenListener } from 'src/utils/token-listener';

const Home = lazy(() => import('./home'));
const SuperAdmin = lazy(() => import('./super-admin'));
const PrivateRoute = lazy(() => import('src/components/shared/common/private-route'));
const NewPassword = lazy(() => import('../components/pages/new-password'));

const AppRoutes = (): JSX.Element => {
  const history = useNavigate();

  useEffect(() => {
    tokenListener((userType, isNewUser) => {
      if (userType === 'SUPER_ADMIN') {
        history(SuperAdminRoutes.main.route);
      } else if (isNewUser) {
        history(UserRoutes.newPassword.route);
      } else {
        history(UserRoutes.main.route);
      }
    });
  }, []);

  return (
    <Suspense fallback={<Preloader />}>
      <Routes>
        <Route path={HomeRoutes.main.route} element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path={SuperAdminRoutes.main.route} element={<SuperAdmin />} />
        </Route>
        <Route
          path={UserRoutes.newPassword.route}
          element={
            <PrivateRoute role={['NORMAL']}>
              <NewPassword />
            </PrivateRoute>
          }
        />
        <Route path="/*" element={<Navigate to={HomeRoutes.main.route} replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
