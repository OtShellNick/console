import React from 'react';
import { Link } from 'react-router-dom';
import Notifications from 'sbx-react-notify';

import './Header.scss';
import 'sbx-react-notify/libs/assets/style/Notifications.scss';

const Header = () => (
  <header className="header">
    <Link to="api.scaletrade.io">API Documentation</Link>
    <Notifications delay={5000} />
  </header>
);

export default Header;
