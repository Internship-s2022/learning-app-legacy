import React, { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { Preloader } from 'src/components/shared/ui';
import { AdminRoutes, HomeRoutes, SuperAdminRoutes, UserRoutes } from 'src/constants/routes';
import { tokenListener } from 'src/utils/token-listener';

const Home = lazy(() => import('./home'));
const SuperAdmin = lazy(() => import('./super-admin'));
const PrivateRoute = lazy(() => import('src/components/shared/common/private-route'));
const NewPassword = lazy(() => import('../components/pages/new-password'));
const Admin = lazy(() => import('./admin'));
const HomeScreen = lazy(() => import('src/components/pages/public/home-screen'));

const AppRoutes = (): JSX.Element => {
  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    tokenListener(({ isNewUser }) => {
      if (isNewUser) {
        history(UserRoutes.newPassword.route);
      } else {
        history(location.pathname);
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
        <Route element={<PrivateRoute role={['NORMAL', 'SUPER_ADMIN']} />}>
          <Route path={AdminRoutes.main.route} element={<Admin />} />
        </Route>
        <Route path="" element={<HomeScreen />} />
        <Route element={<PrivateRoute role={['NORMAL']} />}>
          <Route path={UserRoutes.newPassword.route} element={<NewPassword />} />
        </Route>
        <Route path="/*" element={<Navigate to={HomeRoutes.main.route} replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
