import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from '@components/Layout/Layout';
import Dashboard from '@components/Dashboard/Dashboard';
import Login from '@components/Login/Login';

import '@style/main.scss';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} />
    </Route>
    <Route path="/login" element={<Login />} />
  </Routes>
);

export default App;
