import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Layout from 'src/components/layout';
import {
  AddGroup,
  AddModule,
  AdminCourse,
  AdmissionTestAssignation,
  EditModule,
  EditRegistrationFormView,
  ListGroups,
  ListModules,
  ListRegistrationFormViews,
  Postulants,
  Students,
  ViewRegistrationFormView,
} from 'src/components/pages/admin';
import { EditGroup } from 'src/components/pages/admin/group';
import ModuleInfo from 'src/components/pages/admin/module/module-groups';
import { AdminRoutes, SuperAdminRoutes, UserRoutes } from 'src/constants/routes';
import { RouteType } from 'src/interfaces/routes';
import { useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';
import { convertRoleToRoute } from 'src/utils/formatters';

const Admin = (): JSX.Element => {
  const location = useLocation();
  const { userInfo, authenticated } = useAppSelector((state: RootReducer) => state.auth);
  const { course } = useAppSelector((state: RootReducer) => state.course);
  const [courseRoute, setCourseRoute] = useState<RouteType>(undefined);

  const sidebarRoutes: RouteType[] = useMemo(
    () =>
      userInfo?.courses?.map((e) => ({
        route: convertRoleToRoute(e.role, e.course?._id),
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
        <Route path={AdminRoutes.form.route} element={<ListRegistrationFormViews />} />
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
          <Route path="" element={<ListRegistrationFormViews />} />
          <Route path="edit" element={<EditRegistrationFormView />} />
          <Route path="view/:viewId" element={<ViewRegistrationFormView />} />
        </Route>
        <Route path={AdminRoutes.admissionTest.route}>
          <Route path="" element={<AdmissionTestAssignation />} />
        </Route>
        <Route path={AdminRoutes.postulants.route}>
          <Route path="" element={<Postulants />} />
        </Route>
        <Route path={AdminRoutes.students.route}>
          <Route path="" element={<Students />} />
        </Route>
        <Route path={AdminRoutes.modules.route}>
          <Route path="" element={<ListModules />} />
          <Route path={AdminRoutes.addModule.route} element={<AddModule />} />
          <Route path={AdminRoutes.editModule.route} element={<EditModule />} />
          <Route path={AdminRoutes.infoModule.route} element={<ModuleInfo />} />
        </Route>
        <Route path={AdminRoutes.groups.route}>
          <Route path="" element={<ListGroups />} />
          <Route path={AdminRoutes.addGroup.route} element={<AddGroup />} />
          <Route path={AdminRoutes.editGroup.route} element={<EditGroup />} />
        </Route>
      </Route>
      <Route
        path="/*"
        element={
          <Navigate
            to={
              authenticated?.userType === 'SUPER_ADMIN'
                ? `/super-admin/${SuperAdminRoutes.courses.route}`
                : UserRoutes.main.route
            }
            replace
          />
        }
      />
    </Routes>
  );
};

export default Admin;
