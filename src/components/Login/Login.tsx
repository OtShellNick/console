import React, { useState } from 'react';

import IconLock from '@assets/lock.svg?tsx';
import Button from '@containers/Button/Button';

import './Login.scss';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="login">
      <div className="login__logo" />
      <div className="login__wrap-form">
        <div className="login__wrap-form_heading">
          <IconLock className="login__wrap-form_svg" />
          <div>
            <h3>{isLogin ? 'Login' : 'Register'}</h3>
            <small>Please enter your credentials</small>
          </div>
          <Button
            className="login__wrap-form_btn"
            text={isLogin ? 'Register' : 'Login'}
            onPress={() => setIsLogin((prevState) => !prevState)}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
