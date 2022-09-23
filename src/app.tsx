import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/layout';
const Home = lazy(() => import('./components/pages/home'));
const Login = lazy(() => import('./components/pages/login'));

const App = (): JSX.Element => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to={'/home'} />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
