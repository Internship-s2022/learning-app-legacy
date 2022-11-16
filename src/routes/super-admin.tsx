import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from 'src/components/layout';
import { Storybook } from 'src/components/pages';
import {
  AddCourseFlow,
  AddUser,
  Courses,
  EditCourse,
  EditUser,
  ListUser,
} from 'src/components/pages/super-admin';
import { SuperAdminRoutes } from 'src/constants/routes';

const SuperAdmin = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<Layout routes={SuperAdminRoutes} />}>
        <Route path={SuperAdminRoutes.users.route}>
          <Route path={''} element={<ListUser />} />
          <Route path={SuperAdminRoutes.addUser.route} element={<AddUser />} />
          <Route path={SuperAdminRoutes.editUser.route} element={<EditUser />} />
        </Route>
        <Route path={SuperAdminRoutes.courses.route}>
          <Route path={SuperAdminRoutes.addCourse.route} element={<AddCourseFlow />} />
          <Route path={SuperAdminRoutes.editCourse.route} element={<EditCourse />} />
          <Route path={''} element={<Courses />} />
        </Route>
        <Route path={SuperAdminRoutes.storybook.route} element={<Storybook />} />
        <Route path="/*" element={<Navigate to={SuperAdminRoutes.users.route} replace />} />
      </Route>
    </Routes>
  );
};

export default SuperAdmin;
