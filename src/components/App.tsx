import React, { useEffect, lazy } from 'react';
import {
  Routes, Route, Navigate, useLocation,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as CookieHelper from '@helpers/Cookie';

import { getSelf } from '@actions/Users/User';
import { TLoginResponseData } from '@actions/Users/UsersTypes';
import { TPermissionsGroup } from '@actions/Permission/PermissionTypes';
import { loginUser } from '@store/actions/userActions';
import { getPermissionsGroup } from '@actions/Permission/Permission';
import { getPermissions } from '@store/actions/permissionsActions';

import Layout from '@components/Layout/Layout';

import 'normalize.css';
import '@style/main.scss';

const Dashboard = lazy(() => import('@components/Dashboard/Dashboard'));
const NotFound = lazy(() => import('@components/NotFound/NotFound'));
const Login = lazy(() => import('@components/Login/Login'));

const App = () => {
  const Authorization = CookieHelper.get('Authorization');
  const location = useLocation();
  const dispatch = useDispatch();

  if (!Authorization && location.pathname !== '/login') return <Navigate to="/login" state={{ from: location }} replace />;
  if (Authorization && location.pathname === '/login') return <Navigate to="/" replace />;

  useEffect(() => {
    if (Authorization) {
      getSelf().then((user: TLoginResponseData) => dispatch(loginUser(user)));
      getPermissionsGroup().then((groups: TPermissionsGroup) => dispatch(getPermissions(groups)));
    }
  }, [Authorization]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
