import React, { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from 'src/components/layout';
import { StudentCourse } from 'src/components/pages/student';
import { StudentRoutes, UserRoutes } from 'src/constants/routes';
import { CourseUser } from 'src/interfaces/entities/course-user';
import { RouteType } from 'src/interfaces/routes';
import { useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';
import { convertRoleToRoute } from 'src/utils/formatters';

const Student = (): JSX.Element => {
  const { userInfo } = useAppSelector((state: RootReducer) => state.auth);
  const sidebarRoutes: RouteType[] = useMemo(
    () =>
      userInfo?.courses?.map((cU: CourseUser) => ({
        route: convertRoleToRoute(cU.role, cU.course?._id),
        label: `${cU.course?.name}`,
        role: cU.role,
      })),
    [userInfo?.courses],
  );

  return (
    <Routes>
      <Route
        element={
          <Layout
            sidebarRoutes={sidebarRoutes}
            sidebarOn
            textTitle={
              userInfo?.currentUser?.postulant
                ? `${userInfo.currentUser.postulant.firstName} ${userInfo.currentUser.postulant.lastName}`
                : ''
            }
          />
        }
      >
        <Route path={StudentRoutes.course.route}>
          <Route path="" element={<StudentCourse />} />
        </Route>
      </Route>
      <Route path="/*" element={<Navigate to={UserRoutes.home.route} replace />} />
    </Routes>
  );
};

export default Student;
