import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Layout from 'src/components/layout';
import {
  AdminCourse,
  AdmissionTestAsignation,
  EditView,
  LandingAdmin,
  Module,
  Postulants,
  PublicRegistrationFormView,
  RegistrationForm,
  Students,
} from 'src/components/pages/admin';
import { AddGroup, ListGroups } from 'src/components/pages/admin/group';
import AddModule from 'src/components/pages/admin/module/add';
import EditModule from 'src/components/pages/admin/module/edit';
import { AdminRoutes, SuperAdminRoutes } from 'src/constants/routes';
import { RouteType } from 'src/interfaces/routes';
import { useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';

const Admin = (): JSX.Element => {
  const location = useLocation();
  const { userInfo, authenticated } = useAppSelector((state: RootReducer) => state.auth);
  const { course } = useAppSelector((state: RootReducer) => state.course);
  const [courseRoute, setCourseRoute] = useState<RouteType>(undefined);

  const sidebarRoutes: RouteType[] = useMemo(
    () =>
      userInfo?.courses?.map((e) => ({
        route: `/admin/course/${e.course?._id}`,
        label: `${e.course?.name}`,
        role: e.role,
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
          <Route path="" element={<LandingAdmin />} />
        </Route>
        <Route path={AdminRoutes.form.route} element={<RegistrationForm />} />
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
          <Route path="" element={<AdminCourse />} />
        </Route>
        <Route path={AdminRoutes.form.route}>
          <Route path="" element={<RegistrationForm />} />
          <Route path="edit" element={<EditView />} />
          <Route path="view/:viewId" element={<PublicRegistrationFormView />} />
        </Route>
        <Route path={AdminRoutes.admissionTest.route}>
          <Route path="" element={<AdmissionTestAsignation />} />
        </Route>
        <Route path={AdminRoutes.postulants.route}>
          <Route path="" element={<Postulants />} />
        </Route>
        <Route path={AdminRoutes.students.route}>
          <Route path="" element={<Students />} />
        </Route>
        <Route path={AdminRoutes.modules.route}>
          <Route path="" element={<Module />} />
          <Route path={SuperAdminRoutes.addModule.route} element={<AddModule />} />
          <Route path={SuperAdminRoutes.editModule.route} element={<EditModule />} />
        </Route>
        <Route path={AdminRoutes.groups.route}>
          <Route path="" element={<ListGroups />} />
          <Route path={AdminRoutes.addGroup.route} element={<AddGroup />} />
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
