import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, FormHelperText } from '@mui/material';

import { login } from '@actions/Users/User';
import { loginUser } from '@store/actions/userActions';

type LocationState = {
    from: {
        pathname: string;
    }
}

const LoginForm = () => {
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { from } = location.state as LocationState || { from: { pathname: '/' } };
  const forward = from ? from?.pathname : '/';

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={yup
        .object()
        .shape({
          email: yup
            .string()
            .email('Enter a valid email')
            .required('Email is required'),
          password: yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
        })}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          const user = await login(values);
          dispatch(loginUser(user));
          setSubmitting(false);
          navigate(forward, { replace: true });
        } catch (e) {
          setError(e.message);
          setSubmitting(false);
        }
      }}
    >
      {({
        values, errors, touched, handleBlur, handleSubmit, handleChange, isSubmitting,
      }) => (
        <form
          className="login__form"
          onSubmit={handleSubmit}
        >
          <TextField
            size="small"
            required
            id="outlined-required"
            name="email"
            label="Email"
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.email}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            size="small"
            type="password"
            required
            id="outlined-required"
            name="password"
            label="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            defaultValue={values.password}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          {error && <FormHelperText error>{error}</FormHelperText>}
          <Button color="error" variant="contained" type="submit" disabled={isSubmitting}>SIGN_IN</Button>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
