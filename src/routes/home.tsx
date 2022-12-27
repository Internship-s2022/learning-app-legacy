import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from 'src/components/layout';
import { LoggedHome, Login } from 'src/components/pages';
import { HomeRoutes } from 'src/constants/routes';
import { useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';

const Home = (): JSX.Element => {
  const token = sessionStorage.getItem('token');
  const { userInfo, authenticated } = useAppSelector((state: RootReducer) => state.auth);

  const getRoutes = () => {
    if (authenticated?.userType === 'SUPER_ADMIN') {
      return <Route path="/*" element={<Navigate to={HomeRoutes.superAdmin.route} replace />} />;
    } else if (authenticated?.userType === 'NORMAL') {
      return <Route path="/*" element={<Navigate to={HomeRoutes.home.route} replace />} />;
    } else return <Route path="/*" element={<Navigate to={HomeRoutes.landing.route} replace />} />;
  };

  return (
    <Routes>
      {!token && <Route path={HomeRoutes.login.route} element={<Login />} />}
      <Route element={<Layout headerRoutes={HomeRoutes} />}>
        <Route path={HomeRoutes.landing.route} element={<Landing />} />
        {getRoutes()}
      </Route>
      <Route
        element={
          <Layout
            sidebarOn={false}
            textTitle={`${
              userInfo?.currentUser.postulant.firstName
                ? userInfo?.currentUser.postulant.firstName
                : ''
            } ${
              userInfo?.currentUser.postulant.lastName
                ? userInfo?.currentUser.postulant.lastName
                : ''
            }`}
          />
        }
      >
        <Route path={HomeRoutes.home.route} element={<LoggedHome />} />
      </Route>
    </Routes>
  );
};

export default Home;
