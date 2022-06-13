import React from 'react';
import { Formik } from 'formik';
import { Button, TextField } from '@mui/material';

import './LogForm.scss';

const LogForm = () => (
  <Formik
    initialValues={{ email: '', password: '' }}
    onSubmit={(values) => {
      console.log(values);
    }}
  >
    {({
      values, touched, errors, handleSubmit, isSubmitting, handleBlur, handleChange,
    }) => (
      <form onSubmit={handleSubmit}>
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

export default LogForm;
