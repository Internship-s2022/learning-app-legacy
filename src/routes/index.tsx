import React, { lazy, Suspense, useEffect } from 'react';
import { createBrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import useRoutingInstrumentation from 'react-router-v6-instrumentation';
import { init } from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

import { Preloader } from 'src/components/shared/ui';
import {
  AdminRoutes,
  HomeRoutes,
  PublicRoutes,
  StudentRoutes,
  SuperAdminRoutes,
  UserRoutes,
} from 'src/constants/routes';

const Home = lazy(() => import('./home'));
const SuperAdmin = lazy(() => import('./super-admin'));
const PrivateRoute = lazy(() => import('src/components/shared/common/private-route'));
const NewPassword = lazy(() => import('../components/pages/new-password'));
const Admin = lazy(() => import('./admin'));
const Student = lazy(() => import('./student'));
const User = lazy(() => import('./user'));
const HomeScreen = lazy(() => import('src/components/pages/public/home-screen'));
const PublicRegistrationForm = lazy(() => import('src/components/pages/public/registration-form'));
const CourseInfoScreen = lazy(() => import('src/components/pages/public/course-info'));

const AppRoutes = (): JSX.Element => {
  const routingInstrumentation = useRoutingInstrumentation();

  useEffect(() => {
    if (process.env.REACT_APP_SHOW_ENV && process.env.REACT_APP_SENTRY_DSN) {
      const browserTracing = new BrowserTracing({
        routingInstrumentation,
      });

      init({
        dsn: process.env.REACT_APP_SENTRY_DSN,
        environment: process.env.REACT_APP_SHOW_ENV,
        integrations: [browserTracing],
        autoSessionTracking: true,
        tracesSampleRate: 1.0,
      });
    }
  }, [routingInstrumentation]);

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
        <Route element={<PrivateRoute role={['NORMAL']} />}>
          <Route path={UserRoutes.newPassword.route} element={<NewPassword />} />
          <Route path={UserRoutes.main.route} element={<User />} />
          <Route path={StudentRoutes.main.route} element={<Student />} />
        </Route>
        <Route path={HomeRoutes.homeScreen.route}>
          <Route path={HomeRoutes.homeScreen.route} element={<HomeScreen />} />
          <Route path={PublicRoutes.regForm.route} element={<PublicRegistrationForm />} />
          <Route path={PublicRoutes.course.route} element={<CourseInfoScreen />} />
        </Route>
        <Route path="/*" element={<Navigate to={HomeRoutes.main.route} replace />} />
      </Routes>
    </Suspense>
  );
};

export const router = createBrowserRouter([{ path: '*', element: <AppRoutes /> }], { window });
