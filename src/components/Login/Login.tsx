import React, { useState } from 'react';
import { Button } from '@mui/material';

import IconLock from '@assets/lock.svg?tsx';

import LoginForm from '@components/Login/components/LoginForm';
import RegisterForm from '@components/Login/components/RegisterForm';

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
            size="small"
            variant="contained"
            onClick={() => setIsLogin((prevState) => !prevState)}
            color="inherit"
          >
            {isLogin ? 'Register' : 'Login'}
          </Button>
        </div>
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default Login;
