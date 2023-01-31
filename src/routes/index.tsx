import React, { lazy, Suspense, useEffect } from 'react';
import ReactGA from 'react-ga4';
import {
  createBrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { CreateRouterFunction } from '@sentry/react/types/types';
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

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.REACT_APP_SHOW_ENV,
  release: `radium-learning-app@${process.env.REACT_APP_VERSION}`,
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      ),
    }),
  ],
  normalizeDepth: 6,
  tracesSampleRate: process.env.REACT_APP_SHOW_ENV !== 'production ' ? 1.0 : 0.5,
});

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
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
  }, []);

  useEffect(() => {
    const page = location.pathname + location.search;
    const { location: browserLocation } = window;
    ReactGA.set({
      page,
      location: `${browserLocation.origin}${page}`,
    });
    ReactGA.send({ hitType: 'pageview', page });
  }, [location.pathname, location.search]);

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

const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouter(
  createBrowserRouter as CreateRouterFunction,
);

export const router = sentryCreateBrowserRouter([{ path: '*', element: <AppRoutes /> }], {
  window,
});
