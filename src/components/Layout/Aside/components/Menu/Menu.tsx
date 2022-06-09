import React from 'react';

import DashboardIcon from '@assets/dashboard.svg?tsx';
import { useNavigate } from 'react-router-dom';

const ROUTES = [
  {
    name: 'Dashboard',
    path: '/',
    icon: <DashboardIcon />,
  },
];

const Menu = () => {
  const navigate = useNavigate();

  return <>{ROUTES.map(({ icon, name }) => <li key={name}>{icon}</li>)}</>;
};

export default Menu;
