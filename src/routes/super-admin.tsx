import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from 'src/components/layout';
import { AdminCourse } from 'src/components/pages/admin';
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
      <Route element={<Layout headerRoutes={SuperAdminRoutes} />}>
        <Route path={SuperAdminRoutes.users.route}>
          <Route path="" element={<ListUser />} />
          <Route path={SuperAdminRoutes.addUser.route} element={<AddUser />} />
          <Route path={SuperAdminRoutes.editUser.route} element={<EditUser />} />
        </Route>
        <Route path={SuperAdminRoutes.courses.route}>
          <Route path={SuperAdminRoutes.addCourse.route} element={<AddCourseFlow />} />
          <Route path={SuperAdminRoutes.editCourse.route} element={<EditCourse />} />
          <Route path={SuperAdminRoutes.adminCourse.route} element={<AdminCourse />} />
          <Route path="" element={<Courses />} />
        </Route>
        <Route path="/*" element={<Navigate to={SuperAdminRoutes.users.route} replace />} />
      </Route>
    </Routes>
  );
};

export default SuperAdmin;
