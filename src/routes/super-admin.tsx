import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from 'src/components/layout';
import { Storybook } from 'src/components/pages';
import { AddUser, Courses, Users } from 'src/components/pages/super-admin';
import { SuperAdminRoutes } from 'src/constants/routes';

const SuperAdmin = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<Layout routes={SuperAdminRoutes} logoutOption />}>
        <Route path={SuperAdminRoutes.users.route} element={<Users />} />
        <Route path={SuperAdminRoutes.addUser.route} element={<AddUser />} />
        <Route path={SuperAdminRoutes.courses.route} element={<Courses />} />
        <Route path={SuperAdminRoutes.storybook.route} element={<Storybook />} />
        <Route path="/*" element={<Navigate to={SuperAdminRoutes.users.route} />} />
      </Route>
    </Routes>
  );
};

export default SuperAdmin;
