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
import { getRoles } from '@store/actions/rolesActions';

import Layout from '@components/Layout/Layout';
import Login from '@components/Login/Login';

import 'normalize.css';
import '@style/main.scss';
import { getRolesList } from '@actions/Roles/Roles';
import { TRoles } from '@actions/Roles/RolesTypes';

const Dashboard = lazy(() => import('@components/Dashboard/Dashboard'));
const NotFound = lazy(() => import('@components/NotFound/NotFound'));
const DNS = lazy(() => import('@components/DNS/DNS'));
const DnsRecord = lazy(() => import('@components/DNS/components/DnsRecord/DnsRecord'));
const Clusters = lazy(() => import('@components/Services/Clusters'));
const Users = lazy(() => import('@components/Users/Users'));
const User = lazy(() => import('@components/Users/User/User'));
const Reports = lazy(() => import('@components/Reports/Reports'));
const AllReports = lazy(() => import('@components/AllReports/AllReports'));

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
      getRolesList().then((roles: TRoles) => dispatch(getRoles(roles)));
    }
  }, [Authorization]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />

        <Route path="dns">
          <Route index element={<DNS />} />
          <Route path=":host" element={<DnsRecord />} />
        </Route>

        <Route path="clusters">
          <Route index element={<Clusters />} />
        </Route>

        <Route path="users">
          <Route index element={<Users />} />
          <Route path=":id" element={<User />} />
        </Route>

        <Route path="reports">
          <Route index element={<Reports />} />
          <Route path="all" element={<AllReports />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
