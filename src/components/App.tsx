import React from 'react';
import {
  Routes, Route, Navigate, useLocation,
} from 'react-router-dom';
import * as CookieHelper from '@helpers/Cookie';

import Layout from '@components/Layout/Layout';
import Dashboard from '@components/Dashboard/Dashboard';
import Login from '@components/Login/Login';

import '@style/main.scss';

const App = () => {
  const Authorization = CookieHelper.get('Authorization');
  const location = useLocation();
  console.log(location);
  if (!Authorization && location.pathname !== '/login') return <Navigate to="/login" state={{ from: location }} replace />;
  if (Authorization && location.pathname === '/login') return <Navigate to="/" replace />;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
