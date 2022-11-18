import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Layout from 'src/components/layout';
import LandingAdmin from 'src/components/pages/admin/home';
import AnotherAdmin from 'src/components/pages/admin/home/another';
import { AdminRoutes } from 'src/constants/routes';
const Admin = (): JSX.Element => {
  const location = useLocation();

  return (
    <Routes>
      <Route element={<Layout sidebarOn={false} />}>
        <Route path={AdminRoutes.landing.route}>
          <Route path={''} element={<LandingAdmin />} />
        </Route>{' '}
      </Route>
      <Route element={<Layout routes={AdminRoutes} sidebarOn={true} />}>
        <Route path={AdminRoutes.landing2.route}>
          <Route path={''} element={<AnotherAdmin />} />
        </Route>{' '}
      </Route>
    </Routes>
  );
};

export default Admin;
