import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import DashboardIcon from '@assets/dashboard.svg?tsx';
import DnsIcon from '@assets/dns.svg?tsx';
import Tooltip from '@containers/Tooltip/Tooltip';

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const ROUTES = [
    {
      name: 'Dashboard',
      path: '',
      icon: <DashboardIcon
        onClick={() => {
          navigate('/');
        }}
      />,
    },
    {
      name: 'Cloud DNS',
      path: 'dns',
      icon: <DnsIcon
        onClick={() => {
          navigate('/dns');
        }}
      />,
    },
  ];

  return (
    <>
      {ROUTES.map(({ icon, name, path }) => (
        <li
          className={`nav__list_item ${location.pathname.split('/')[1] === path ? 'nav__list_item-active' : ''}`}
          key={name}
        >
          <Tooltip text={name} placement="right">{icon}</Tooltip>
        </li>
      ))}
    </>
  );
};

export default Menu;
