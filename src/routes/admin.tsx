import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Layout from 'src/components/layout';
import LandingAdmin from 'src/components/pages/admin/home';
import AdminCourse from 'src/components/pages/super-admin/courses/admin';
import { AdminRoutes, SuperAdminRoutes } from 'src/constants/routes';
import { RouteType } from 'src/interfaces/routes';
import { useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';

const Admin = (): JSX.Element => {
  const { userInfo, authenticated } = useAppSelector((state: RootReducer) => state.auth);
  const { course } = useAppSelector((state: RootReducer) => state.course);
  const location = useLocation();
  const [courseRoute, setCourseRoute] = useState<RouteType>(undefined);
  const sidebarRoutes: RouteType[] = useMemo(
    () =>
      userInfo?.courses?.map((e) => ({
        route: `/admin/course/${e.course?._id}`,
        label: `${e.course?.name}`,
      })),
    [userInfo?.courses],
  );

  useEffect(() => {
    if (sidebarRoutes?.length) {
      setCourseRoute(sidebarRoutes.find((e) => location.pathname.includes(e.route)));
    }
  }, [sidebarRoutes, location.pathname]);

  return (
    <Routes>
      <Route
        element={
          <Layout
            sidebarOn={false}
            textTitle={
              userInfo?.currentUser?.postulant?.firstName &&
              `${userInfo?.currentUser.postulant.firstName} ${userInfo?.currentUser.postulant.lastName}`
            }
          />
        }
      >
        <Route path={AdminRoutes.landing.route}>
          <Route path={''} element={<LandingAdmin />} />
        </Route>
      </Route>
      <Route
        element={
          <Layout
            headerRoutes={AdminRoutes}
            sidebarRoutes={sidebarRoutes}
            sidebarOn={authenticated?.userType !== 'SUPER_ADMIN'}
            textTitle={
              authenticated?.userType === 'SUPER_ADMIN' ? course?.name : courseRoute?.label
            }
          />
        }
      >
        <Route path={AdminRoutes.course.route}>
          <Route path={''} element={<AdminCourse />} />
        </Route>
      </Route>
      <Route
        path="/*"
        element={
          <Navigate
            to={
              authenticated?.userType === 'SUPER_ADMIN'
                ? `/super-admin/${SuperAdminRoutes.courses.route}`
                : AdminRoutes.landing.route
            }
            replace
          />
        }
      />
    </Routes>
  );
};

export default Admin;
