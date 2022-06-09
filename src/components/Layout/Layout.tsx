import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@components/Layout/Header/Header';
import Aside from '@components/Layout/Aside/Aside';

import './Layout.scss';

const Layout = () => (
  <div className="container">
    <Aside />
    <main>
      <Header />
      <Outlet />
    </main>
  </div>
);

export default Layout;
