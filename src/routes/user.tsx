import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from 'src/components/layout';
import { LoggedHome } from 'src/components/pages';
import { UserRoutes } from 'src/constants/routes';
import { useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';

const User = (): JSX.Element => {
  const { userInfo } = useAppSelector((state: RootReducer) => state.auth);

  return (
    <Routes>
      <Route
        element={
          <Layout
            sidebarOn={false}
            textTitle={
              userInfo?.currentUser?.postulant
                ? `${userInfo.currentUser.postulant.firstName} ${userInfo.currentUser.postulant.lastName}`
                : ''
            }
          />
        }
      >
        <Route path={UserRoutes.home.route}>
          <Route path="" element={<LoggedHome />} />
        </Route>
      </Route>
      <Route path="/*" element={<Navigate to={UserRoutes.home.route} replace />} />
    </Routes>
  );
};

export default User;
