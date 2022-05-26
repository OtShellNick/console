import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';

import Login from '@actions/User';

const LoginForm = () => (
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
        const user = await Login(values);
        console.log('user', user);
      } catch (e) {
        console.log('err', e);
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
        <Button color="error" variant="contained" type="submit" disabled={isSubmitting}>SIGN_IN</Button>
      </form>
    )}
  </Formik>
);

export default LoginForm;
