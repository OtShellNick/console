import React from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';

import DashboardIcon from '@assets/dashboard.svg?tsx';
import { useLocation, useNavigate } from 'react-router-dom';

import 'react-popper-tooltip/dist/styles.css';

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({ placement: 'right' });

  const ROUTES = [
    {
      name: 'Dashboard',
      path: '/',
      icon: <DashboardIcon
        onClick={() => {
          navigate('/');
        }}
      />,
    },
  ];

  return (
    <>
      {ROUTES.map(({ icon, name, path }) => (
        <li
          className={`nav__list_item ${location.pathname === path ? 'nav__list_item-active' : ''}`}
          key={name}
          ref={setTriggerRef}
        >
          {icon}
          {visible && (
          <div ref={setTooltipRef} {...getTooltipProps({ className: 'tooltip-container' })}>
            <div {...getArrowProps({ className: 'tooltip-arrow' })} />
            {name}
          </div>
          )}
        </li>
      ))}
    </>
  );
};

export default Menu;
