import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { logout } from '@actions/Users/User';

import './Aside.scss';

import Menu from '@components/Layout/Aside/components/Menu/Menu';

import LogoutIcon from '@assets/logout.svg?tsx';

const logo = require('@assets/logo_sm.png');

const Aside = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="aside">
      <nav className="aside__nav">
        <ul className="nav__list">
          <li className="nav__list_item aside__logo">
            <Link className="aside__logo_link" to="/">
              <img src={logo} alt="logo" />
            </Link>
          </li>
          <Menu />
          <li className="nav__list_item">
            <LogoutIcon onClick={() => {
              logout();
              navigate('/login', { replace: true, state: { from: location } });
            }}
            />
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
