import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/layout';
import { Home, Login } from './components/pages';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to={'/home'} />} />
      </Route>
    </Routes>
  );
};

export default App;
