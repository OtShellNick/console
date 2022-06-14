import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@components/Layout/Header/Header';
import Aside from '@components/Layout/Aside/Aside';
import Preloader from '@components/Preloader/Preloader';

import './Layout.scss';

const Layout = () => (
  <div className="container">
    <Aside />
    <main>
      <Header />
      <Suspense fallback={<Preloader />}>
        <Outlet />
      </Suspense>
    </main>
  </div>
);

export default Layout;
